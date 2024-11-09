import type { DialogProps } from '@mui/material';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Stack, Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type ChangePasswordSchemaType = zod.infer<typeof ChangePasswordSchema>;

export const ChangePasswordSchema = zod
  .object({
    password: zod
      .string()
      .min(1, { message: 'Bạn chưa nhập mật khẩu!' })
      .min(6, { message: 'Mật khẩu ít nhất 6 kí tự!' }),
    newPassword: zod
      .string()
      .min(1, { message: 'Bạn chưa nhập mật khẩu mới!' })
      .min(6, { message: 'Mật khẩu ít nhất 6 kí tự!' }),
    confirm: zod.string().min(1, { message: 'Bạn chưa nhập lại mật khẩu mới!' }),
  })
  .refine((data) => data.newPassword === data.confirm, {
    message: 'Mật khẩu không giống nhau!',
    path: ['confirm'], // path of error
  });
type Props = Omit<DialogProps, 'children' | 'onClose'> & {
  onClose: () => void;
};

export default function ChangePassword({ onClose, ...dialogProps }: Props) {
  const defaultValues = useMemo(
    () => ({
      password: '',
      newPassword: '',
      confirm: '',
    }),
    []
  );

  const methods = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // await changePassword({ newPassword: data.newPassword, password: data.password });
      onClose();
      reset();
      toast.success('Thay đổi mật khẩu thành công!');
    } catch (error) {
      console.error(error);
      switch (error?.status) {
        case 401:
          toast.error('Mật khẩu hiện tại không đúng!');
          setError('password', { message: 'Mật khẩu không đúng!' });
          break;

        default:
          toast.error('Đã có lỗi xảy ra!');

          break;
      }
    }
  });

  return (
    <Dialog
      onClose={onClose}
      {...dialogProps}
      PaperProps={{
        sx: {
          maxWidth: 'sm',
          width: 1,
        },
      }}
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ py: 1 }}>
            <Field.Text
              name="password"
              label="Mật khẩu hiện tại"
              placeholder="Nhập mật khẩu hiện tại"
            />
            <Field.Text name="newPassword" label="Mật khẩu mới" placeholder="Nhập mật khẩu mới" />
            <Field.Text
              name="confirm"
              label="Nhập lại mật khẩu mới"
              placeholder="Nhập lại mật khẩu mới"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Đóng</Button>
          <LoadingButton loading={isSubmitting} variant="contained" type="submit">
            Cập nhật
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
