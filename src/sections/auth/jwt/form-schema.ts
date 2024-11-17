import { z as zod } from 'zod';

import { MAX_FILE_SIZE } from '../../../config-global';
import { regexPhoneNumber } from '../../../utils/regex';
import { schemaHelper } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignUpSchema = zod
  .object({
    userName: zod.string().min(1, { message: 'Username là bắt buộc!' }),
    fullname: zod.string().min(1, { message: 'Họ và tên là bắt buộc!' }),
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
    grade: zod.string().min(1, { message: 'Khối lớp là bắt buộc!' }),
    location: zod.string().min(1, { message: 'Địa chỉ là bắt buộc!' }),
    dateOfBirth: zod.string().min(1, { message: 'Ngày sinh là bắt buộc!' }),
    placeOfWork: zod.string().min(1, { message: 'Nơi làm việc là bắt buộc!' }),
    // role: zod.string().min(1, { message: 'Vai trò là bắt buộc!' }),
    phoneNumber: zod
      .string()
      .min(1, { message: 'Số điện thoại là bắt buộc!' })
      .refine((value) => regexPhoneNumber.test(value), {
        message: 'Số điện thoại không hợp lệ',
      }),
    photo: schemaHelper
      .file({ message: { required_error: 'Bạn chưa chọn hình!' } })
      .refine((file: any) => file?.size <= MAX_FILE_SIZE, 'File tối đa 10MB'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không giống nhau!',
    path: ['confirmPassword'], // path of error
  });
