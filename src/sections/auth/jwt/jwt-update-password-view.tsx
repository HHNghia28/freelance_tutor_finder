/* eslint-disable react-hooks/rules-of-hooks */
import { z as zod } from 'zod';
import { useMemo } from 'react';
import { Navigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { SentIcon } from 'src/assets/icons';
import { resetPassword } from 'src/actions/auth';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export type UpdatePasswordSchemaType = zod.infer<typeof UpdatePasswordSchema>;

export const UpdatePasswordSchema = zod.object({
  token: zod.string().min(1, { message: 'Email là bắt buộc!' }),
  email: zod
    .string()
    .min(1, { message: 'Email là bắt buộc!' })
    .email({ message: 'Email không hợp lệ!' }),
  newPassword: zod
    .string()
    .min(1, { message: 'Mật khẩu là bắt buộc!' })
    .min(6, { message: 'Mật khẩu ít nhất 6 kí tự!' }),
});

// ----------------------------------------------------------------------

export function JwtUpdatePasswordView() {
  const password = useBoolean();
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  if (!email || !token) {
    return <Navigate to={paths.auth.jwt.forgotPassword} replace />;
  }

  const defaultValues = useMemo(
    () => ({
      token: token as string,
      email: email as string,
      newPassword: '',
    }),
    [email, token]
  );

  const methods = useForm<UpdatePasswordSchemaType>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await resetPassword({
        email: data.email,
        token: data.token,
        newPassword: data.newPassword,
      });
      toast.success('Cập nhật mật khẩu thành công!');
      router.replace(paths.auth.jwt.signIn);
    } catch (error) {
      console.error(error);
      toast.success('Đã có lỗi xảy ra!');
    }
  });

  const renderHead = (
    <>
      <SentIcon sx={{ mx: 'auto' }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5, textAlign: 'center', whiteSpace: 'pre-line' }}>
        <Typography variant="h5">Đặt lại mật khẩu mới</Typography>

        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`We've sent a 6-digit confirmation email to your email. \nPlease enter the code in below box to verify your email.`}
        </Typography> */}
      </Stack>
    </>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text
        name="email"
        label="Email"
        placeholder="example@gmail.com"
        InputLabelProps={{ shrink: true }}
        disabled
        InputProps={{
          readOnly: true,
        }}
      />

      <Field.Text
        autoFocus
        name="newPassword"
        label="Mật khẩu mới"
        placeholder="6+ kí tự"
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Cập nhật mật khẩu
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.signIn}
        color="inherit"
        variant="subtitle2"
        sx={{ mx: 'auto', alignItems: 'center', display: 'inline-flex' }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} sx={{ mr: 0.5 }} />
        Quay lại đăng nhập
      </Link>
    </Stack>
  );

  return (
    <>
      {renderHead}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
