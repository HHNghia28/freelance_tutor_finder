import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { FormHelperText } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from '../../../auth/hooks';
import { uploadFile } from '../../../actions/upload';
import { tutorRegister } from '../../../actions/tutor';
import { acceptOnlyNumber } from '../../../utils/input-strict';
import { TutorRegisterSchema } from './form/tutor-register-schema';

import type { TutorRegisterSchemaType } from './form/tutor-register-schema';

// ----------------------------------------------------------------------

export function TutorRegisterForm() {
  const router = useRouter();

  const { user } = useAuthContext();

  const defaultValues = useMemo(
    () => ({
      userId: user?.user?.id || '',
      citizenId: '',
      selfIntroduction: '',
      teachingAchievement: '',
      academicSpecialty: '',
      cvUrl: null,
    }),
    [user]
  );

  const methods = useForm<TutorRegisterSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(TutorRegisterSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { cvUrl, ...rest } = data;

      const uploadRes = await uploadFile(cvUrl as File);
      await tutorRegister({
        ...rest,
        cvUrl: uploadRes.fileUrl,
      });
      reset();
      toast.success('Đơn đăng kí đã được gửi!');
      router.push(paths.user.root);
    } catch (error) {
      toast.error('Đã có lỗi xảy ra!');

      console.error(error);
    }
  });

  const handleDropCV = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('cvUrl', newFile, { shouldValidate: true, shouldDirty: true });
      }
    },
    [setValue]
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 2, pb: 5, px: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Avatar
                src={user?.user?.photo}
                alt={user?.user?.userName}
                sx={{ width: 120, height: 120, mx: 'auto' }}
              />
            </Box>

            <Box>
              <Typography variant="subtitle2">CV của bạn</Typography>
              <Field.UploadBox
                name="cvUrl"
                accept={{
                  'application/pdf': ['.pdf'], // Accept only PDF files
                }}
                sx={{ width: 1 }}
                onDrop={handleDropCV}
                onRemove={() => setValue('cvUrl', null)}
              />
              {(values.cvUrl || errors.cvUrl) && (
                <FormHelperText error={!!errors?.cvUrl} sx={{ mx: 0 }}>
                  {(values.cvUrl as any)?.path || errors?.cvUrl?.message || ''}
                </FormHelperText>
              )}
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Grid spacing={2} container>
              <Grid xs={12}>
                <Field.Text
                  multiline
                  maxRows={3}
                  minRows={2}
                  name="selfIntroduction"
                  label="Giới thiệu"
                  fullWidth
                  sx={{ rowSpan: 'all' }}
                />
              </Grid>
              <Grid xs={12}>
                <Field.Text name="academicSpecialty" label="Điểm nổi bật" />
              </Grid>
              <Grid xs={12}>
                <Field.Text name="teachingAchievement" label="Thành tựu" />
              </Grid>
              <Grid xs={12}>
                <Field.Text name="citizenId" label="Số CCCD/CMND" onKeyDown={acceptOnlyNumber} />
              </Grid>
            </Grid>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ minWidth: 200 }}
              >
                Đăng kí
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
