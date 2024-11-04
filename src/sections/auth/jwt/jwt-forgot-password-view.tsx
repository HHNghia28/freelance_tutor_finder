import { z as zod } from 'zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { forgotPassword } from 'src/actions/auth';
import { PasswordIcon, EmailInboxIcon } from 'src/assets/icons';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type ResetPasswordSchemaType = zod.infer<typeof ResetPasswordSchema>;

export const ResetPasswordSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email là bắt buộc!' })
    .email({ message: 'Email không hợp lệ!' }),
});

// ----------------------------------------------------------------------

export function JwtForgotPasswordView() {
  const defaultValues = { email: '' };
  const isSended = useBoolean();
  const methods = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    getValues,

    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await forgotPassword(data.email);
      toast.success('Đã gửi yêu cầu thành công!');
      isSended.onTrue();
    } catch (error) {
      console.error(error);
      toast.error('Đã có lỗi xảy ra!');
      isSended.onFalse();
    }
  });
  useEffect(
    () => () => {
      reset(defaultValues);
      isSended.onFalse();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const renderHead = (
    <>
      <PasswordIcon sx={{ mx: 'auto' }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5, textAlign: 'center', whiteSpace: 'pre-line' }}>
        <Typography variant="h5">Quên mật khẩu?</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Nhập địa chỉ email liên kết với tài khoản của bạn và chúng tôi sẽ gửi một liên kết đặt lại
          mật khẩu tới email của bạn.
        </Typography>
      </Stack>
    </>
  );

  const returnBtn = (
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
  );
  const renderForm = (
    <Stack spacing={3}>
      <Field.Text
        name="email"
        label="Email"
        placeholder="example@gmail.com"
        autoFocus
        InputLabelProps={{ shrink: true }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Gủi yêu cầu..."
      >
        Gủi yêu cầu
      </LoadingButton>

      {returnBtn}
    </Stack>
  );

  const renderResult = (
    <>
      <EmailInboxIcon sx={{ mx: 'auto' }} />

      <Stack spacing={3} sx={{ textAlign: 'center', whiteSpace: 'pre-line' }}>
        <Typography variant="h5">Gửi yêu cầu thành công!</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Một email xác thực đã được gửi tới email <strong>{getValues('email')}</strong>. Hãy kiểm
          tra hộp thư của bạn
        </Typography>
        {returnBtn}
      </Stack>
    </>
  );

  return (
    <>
      {!isSended.value && (
        <>
          {renderHead}
          <Form methods={methods} onSubmit={onSubmit}>
            {renderForm}
          </Form>
        </>
      )}

      {isSended.value && renderResult}
    </>
  );
}
