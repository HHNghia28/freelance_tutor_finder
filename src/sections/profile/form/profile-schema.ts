import { z as zod } from 'zod';

import { MAX_FILE_SIZE } from 'src/config-global';

import { regexPhoneNumber } from '../../../utils/regex';
import { schemaHelper } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export type ProfileSchemaType = zod.infer<typeof ProfileSchema>;

export const ProfileSchema = zod.object({
  fullname: zod.string().min(1, { message: 'Họ và tên là bắt buộc!' }),
  gender: zod.string().min(1, { message: 'Giới tính là bắt buộc!' }),
  location: zod.string().min(1, { message: 'Địa chỉ là bắt buộc!' }),
  dateOfBirth: zod.string().min(1, { message: 'Ngày sinh là bắt buộc!' }),
  phoneNumber: zod
    .string()
    .min(1, { message: 'Số điện thoại là bắt buộc!' })
    .refine((value) => regexPhoneNumber.test(value), {
      message: 'Số điện thoại không hợp lệ',
    }),
  photo: schemaHelper
    .file({ message: { required_error: 'Bạn chưa chọn hình!' } })
    .refine(
      (file: any) => (typeof file === 'string' ? true : file?.size <= MAX_FILE_SIZE),
      'File tối đa 10MB'
    ),
});
