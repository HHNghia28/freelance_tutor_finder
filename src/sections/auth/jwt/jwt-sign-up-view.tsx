import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { register } from 'src/actions/auth';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';

import { SignUpSchema } from './form-schema';
import { uploadFile } from '../../../actions/upload';
import { useGetGrades } from '../../../actions/grade';
import { sortStringByNumbers } from '../../../utils/helper';

import type { SignUpSchemaType } from './form-schema';

// ----------------------------------------------------------------------

export function JwtSignUpView() {
  const { checkUserSession } = useAuthContext();

  const { grades } = useGetGrades();

  const router = useRouter();

  const password = useBoolean();

  const showConfirmPassword = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    fullName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    // role: 'Student',
    gender: '',
    location: '',
    dateOfBirth: '',
    placeOfWork: '',
    grade: '',
    photo: null,
  };

  const gradeOptions = useMemo(() => {
    if (!grades.length) return [];
    return sortStringByNumbers(grades, (a, b) => ({
      a: a.name,
      b: b.name,
    }));
  }, [grades]);

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { photo, ...rest } = data;
      const uploadRes = await uploadFile(photo as File);

      await register({ ...rest, photo: uploadRes.fileUrl, role: 'Student' });
      await checkUserSession?.();

      router.push(paths.auth.jwt.signIn);
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
      <Field.UploadAvatar name="photo" onDrop={handleDropPhoto} />

      <Field.Text name="userName" label="Username" InputLabelProps={{ shrink: true }} />

      <Field.Text name="email" label="Email" InputLabelProps={{ shrink: true }} />

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
        label="Nhập lại mật khẩu"
        placeholder="6+ kí tự"
        type={showConfirmPassword.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={showConfirmPassword.onToggle} edge="end">
                <Iconify
                  icon={showConfirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Divider />

      <Field.Text name="fullname" label="Họ và tên" InputLabelProps={{ shrink: true }} />

      <Field.Text name="phoneNumber" label="Số điện thoại" InputLabelProps={{ shrink: true }} />

      <Field.Text name="location" label="Địa chỉ" InputLabelProps={{ shrink: true }} />

      <Field.Text name="placeOfWork" label="Nơi làm việc" InputLabelProps={{ shrink: true }} />

      <Field.DatePicker name="dateOfBirth" label="Ngày sinh" disableFuture reduceAnimations />

      <Field.Select name="grade" label="Khối lớp" InputLabelProps={{ shrink: true }}>
        {gradeOptions.map((grade) => (
          <MenuItem key={grade.id} value={grade.name}>
            {grade.name}
          </MenuItem>
        ))}
      </Field.Select>
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
      </Box>

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
