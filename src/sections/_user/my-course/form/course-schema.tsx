import dayjs from 'dayjs';
import { z as zod } from 'zod';

import { MAX_FILE_SIZE } from 'src/config-global';

import { schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type CourseSchemaType = zod.infer<typeof CourseSchema>;

export const CourseSchema = zod
  .object({
    title: zod.string().min(1, { message: 'Tên khóa học là bắt buộc!' }),
    description: zod.string().min(1, { message: 'Mô tả là bắt buộc!' }),
    daysPerMonth: zod.string().min(1, { message: 'Số ngày học là bắt buộc!' }),
    courseId: zod.string().min(1, { message: 'Môn học là bắt buộc!' }),
    gradeId: zod.string().min(1, { message: 'Khối lốp là bắt buộc!' }),
    startDate: zod.string().min(1, { message: 'Ngày bắt đầu là bắt buộc!' }),
    endDate: zod.string().min(1, { message: 'Ngày kết thúc là bắt buộc!' }),
    fee: zod
      .number({
        required_error: 'Bạn chưa nhập học phí!',
        invalid_type_error: 'Học phí không hợp lệ!',
      })
      .min(0, 'Học phí phải lớn hơn hoặc bằng 0!'),
    thumbnail: schemaHelper
      .file({ message: { required_error: 'Bạn chưa chọn hình khóa học!' } })
      .refine((file: any) => file?.size <= MAX_FILE_SIZE, 'File tối đa 10MB'),
  })
  .refine((data) => dayjs(data.startDate).isBefore(dayjs(data.endDate)), {
    message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
    path: ['endDate'],
  });
