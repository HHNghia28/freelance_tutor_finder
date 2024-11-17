import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Card, Backdrop, CircularProgress } from '@mui/material';

import { uploadFile } from 'src/actions/upload';
import { updateProfile, useGetProfile } from 'src/actions/account';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';

import { ProfileSchema } from './form/profile-schema';

import type { ProfileSchemaType } from './form/profile-schema';

// ----------------------------------------------------------------------

export function ProfileForm() {
  const { user } = useAuthContext();
  const { profile, profileLoading, profileEmpty } = useGetProfile(user?.user?.id);

  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = useMemo(
    () => ({
      fullname: profile?.fullname || '',
      phoneNumber: profile?.phoneNumber || '',
      gender: profile?.gender || '',
      location: profile?.location || '',
      dateOfBirth: profile?.dateOfBirth || '',
      photo: profile?.photo || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile, profileLoading]
  );

  const methods = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, dirtyFields },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { photo, ...rest } = data;
      if (dirtyFields.photo) {
        const uploadRes = await uploadFile(photo as File);
        await updateProfile(profile!.id, { ...rest, photo: uploadRes.fileUrl });
      } else {
        await updateProfile(profile!.id, data);
      }
      toast.success('Cập nhật thành công!');
      setErrorMsg('');
      reset(defaultValues);
    } catch (error) {
      toast.error(error?.message || 'Đã có lỗi xảy ra!');
      setErrorMsg(error?.message || 'Đã có lỗi xảy ra!');
    }
  });
  const handleDropPhoto = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photo', newFile, { shouldValidate: true, shouldDirty: true });
      }
    },
    [setValue]
  );

  return (
    <>
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      <Form methods={methods} onSubmit={onSubmit}>
        <Card sx={{ pt: 2, pb: 5, px: 3 }}>
          <Stack spacing={3}>
            <Box sx={{ mb: 3 }}>
              <Field.UploadAvatar
                name="photo"
                sx={{ width: 200, height: 200 }}
                onDrop={handleDropPhoto}
                onDelete={() => setValue('photo', null)}
              />
            </Box>
            <Field.Text name="fullname" label="Họ và tên" InputLabelProps={{ shrink: true }} />
            <Field.Text
              name="phoneNumber"
              label="Số điện thoại"
              InputLabelProps={{ shrink: true }}
            />
            <Field.Text name="location" label="Địa chỉ" InputLabelProps={{ shrink: true }} />
            <Field.DatePicker name="dateOfBirth" label="Ngày sinh" disableFuture reduceAnimations />
            <Box sx={{ pl: 2 }}>
              <Field.RadioGroup
                name="gender"
                label="Giới tính"
                row
                options={[
                  {
                    value: 'male',
                    label: 'Nam',
                  },
                  {
                    value: 'female',
                    label: 'Nữ',
                  },
                ]}
              />
            </Box>{' '}
            <LoadingButton
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting || profileLoading}
              disabled={profileEmpty || !Object.keys(dirtyFields).length}
              sx={{ width: 'fit-content', ml: 'auto' }}
            >
              Cập nhật
            </LoadingButton>
          </Stack>
        </Card>
        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={profileLoading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      </Form>
    </>
  );
}
