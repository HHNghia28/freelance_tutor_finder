import { useForm } from 'react-hook-form';
import { useMemo, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { FormHelperText } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { MAX_FILE_SIZE } from 'src/config-global';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { TutorRegisterSchema } from './form/tutor-register-schema';

import type { TutorRegisterSchemaType } from './form/tutor-register-schema';

// ----------------------------------------------------------------------

export function TutorRegisterForm() {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      userId: '',
      title: '',
      faculty: '',
      transportation: '',
      onlineTutor: true,
      selfIntroduction: '',
      teachingAchievement: '',
      academicSpecialty: '',
      cvUrl: null,
      photo: null,
    }),
    []
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

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success('Đơn đăng kí đã được gửi!');
      router.push(paths.user.root);
    } catch (error) {
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
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 2, pb: 5, px: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Field.UploadAvatar
                name="photo"
                maxSize={MAX_FILE_SIZE}
                onRemove={() => setValue('photo', null)}
                onDrop={handleDropPhoto}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Field.Text
                multiline
                maxRows={3}
                minRows={2}
                name="selfIntroduction"
                label="Giới thiệu"
                fullWidth
                sx={{ rowSpan: 'all' }}
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
                maxSize={MAX_FILE_SIZE}
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
              <Grid xs={12} md={6}>
                <Field.Text name="title" label="Chức danh" placeholder="Giáo viện, sinh viên,..." />
              </Grid>
              <Grid xs={12} md={6}>
                <Field.Text name="faculty" label="Chuyên ngành" />
              </Grid>
              <Grid xs={12} md={6}>
                <Field.Text name="transportation" label="Phương tiện di chuyển" />
              </Grid>
              <Grid xs={12} md={6}>
                <Field.Text name="academicSpecialty" label="Điểm nổi bật" />
              </Grid>
              <Grid xs={12} md={6}>
                <Field.Text name="teachingAchievement" label="Thành tựu" />
              </Grid>
              <Grid xs={12} md={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Hình thức giảng dạy</Typography>
                  <Field.RadioGroup
                    name="onlineTutor"
                    options={[
                      {
                        value: true as any,
                        label: 'Online',
                      },
                      {
                        value: false as any,
                        label: 'Offline',
                      },
                    ]}
                    sx={{ pl: 2 }}
                    row
                  />
                </Box>
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
