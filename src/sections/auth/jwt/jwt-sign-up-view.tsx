import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignUpSchema = zod
  .object({
    username: zod.string().min(1, { message: 'Username là bắt buộc!' }),
    email: zod
      .string()
      .min(1, { message: 'Email là bắt buộc!' })
      .email({ message: 'Email không hợp lệ!' }),
    password: zod
      .string()
      .min(1, { message: 'Mật khẩu là bắt buộc!' })
      .min(6, { message: 'Mật khẩu ít nhất 6 kí tự!' }),
    confirmPassword: zod
      .string()
      .min(1, { message: 'Nhập lại mật khẩu là bắt buộc!' })
      .min(6, { message: 'Mật khẩu ít nhất 6 kí tự!' }),
    gender: zod.string().min(1, { message: 'Giới tính là bắt buộc!' }),
    location: zod.string().min(1, { message: 'Địa chỉ là bắt buộc!' }),
    dateOfBirth: zod.string().min(1, { message: 'Ngày sinh là bắt buộc!' }),
    placeOfWork: zod.string().min(1, { message: 'Nơi làm việc là bắt buộc!' }),
    citizenId: zod.string().min(1, { message: 'Tỉnh/Thành phố là bắt buộc!' }),
    role: zod.string().min(1, { message: 'Vai trò là bắt buộc!' }),
    phoneNumber: zod
      .string()
      .min(1, { message: 'Số điện thoại là bắt buộc!' })
      .refine(
        (value) => {
          const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
          return phoneRegex.test(value);
        },
        {
          message: 'Số điện thoại không hợp lệ',
        }
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không giống nhau!',
    path: ['confirmPassword'], // path of error
  });

// ----------------------------------------------------------------------

export function JwtSignUpView() {
  const { checkUserSession } = useAuthContext();

  const router = useRouter();

  const password = useBoolean();
  const showConfirmPasswrod = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    fullName: 'Hello',
    email: 'hello@gmail.com',
    password: '@demo1',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // await signUp({
      //   email: data.email,
      //   password: data.password,
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      // });
      // await checkUserSession?.();

      await new Promise((resolve) => setTimeout(resolve, 500));

      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  const renderLogo = (
    <Typography variant="h3" sx={{ textAlign: 'center', mb: 4 }} gutterBottom>
      Tutor Finder
    </Typography>
  );

  const renderHead = (
    <Stack alignItems="center" spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant="h5">Đăng kí tài khoản</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Đã có tài khoản?
        </Typography>

        <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
          Đăng nhập
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text name="username" label="Username" InputLabelProps={{ shrink: true }} />

      <Field.Text name="email" label="Email" InputLabelProps={{ shrink: true }} />
      <Field.Text name="phoneNumber" label="Số điện thoại" InputLabelProps={{ shrink: true }} />

      <Field.Text
        name="password"
        label="Mật khẩu"
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
      <Field.Text
        name="confirmPassword"
        label="Mật khẩu"
        placeholder="6+ kí tự"
        type={showConfirmPasswrod.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={showConfirmPasswrod.onToggle} edge="end">
                <Iconify
                  icon={showConfirmPasswrod.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
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
      <Field.Text name="location" label="Địa chỉ" InputLabelProps={{ shrink: true }} />
      <Field.Text name="placeOfWork" label="Nơi làm việc" InputLabelProps={{ shrink: true }} />
      <Field.Select name="citizenId" label="Tỉnh/Thành phố" InputLabelProps={{ shrink: true }}>
        <MenuItem>Cần Thơ</MenuItem>
        <MenuItem>Hồ Chí Minh</MenuItem>
        <MenuItem>Hồ Nội</MenuItem>
      </Field.Select>
      <Field.Text name="role" label="Vai trò" InputLabelProps={{ shrink: true }} />
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Đăng kí..."
      >
        Đăng kí
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderLogo}

      {renderHead}
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
