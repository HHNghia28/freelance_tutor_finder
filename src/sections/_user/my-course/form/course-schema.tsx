import dayjs from 'dayjs';
import { z as zod } from 'zod';

import { MAX_FILE_SIZE } from 'src/config-global';

import { schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type CourseSchemaType = zod.infer<typeof CourseSchema>;

export const CourseSchema = zod
  .object({
    title: zod.string().min(1, { message: 'Tên bài đăng là bắt buộc!' }),
    description: zod.string().min(1, { message: 'Mô tả là bắt buộc!' }),
    daysPerMonth: zod.string().min(1, { message: 'Số ngày học là bắt buộc!' }),
    courseId: zod.coerce.string().min(1, { message: 'Môn học là bắt buộc!' }),
    gradeId: zod.coerce.string().min(1, { message: 'Khối lớp là bắt buộc!' }),
    startDate: zod.string().min(1, { message: 'Ngày bắt đầu là bắt buộc!' }),
    endDate: zod.string().min(1, { message: 'Ngày kết thúc là bắt buộc!' }),
    fee: zod
      .number({
        required_error: 'Bạn chưa nhập học phí!',
        invalid_type_error: 'Học phí không hợp lệ!',
      })
      .min(0, 'Học phí phải lớn hơn hoặc bằng 0!'),
    discount: zod
      .number({
        invalid_type_error: 'Giảm giá không hợp lệ!',
      })
      .nonnegative('Giảm giá phải lớn hơn hoặc bằng 0%!')
      .max(100, 'Phần trăm giảm tối đa 100%!'),
    thumbnail: schemaHelper
      .file({ message: { required_error: 'Bạn chưa chọn hình khóa học!' } })
      .refine(
        (file: any) => (typeof file === 'string' ? true : file?.size <= MAX_FILE_SIZE),
        'File tối đa 10MB'
      ),
    freeCourses: schemaHelper.files({
      message: { required_error: 'Bạn chưa chọn video!' },
      minFiles: 1,
    }),
    isStartDateDirty: zod.boolean(),
    isEndDateDirty: zod.boolean(),
  })
  .superRefine((data, ctx) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if startDate and endDate are dirty
    const { isStartDateDirty, isEndDateDirty } = data;

    // Validate startDate if it's dirty
    if (isStartDateDirty) {
      if (!data.startDate || data.startDate.length < 1) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'Ngày bắt đầu là bắt buộc!',
          path: ['startDate'],
        });
      }
      if (new Date(data.startDate) < today) {
        ctx.addIssue({
          code: zod.ZodIssueCode.invalid_date,
          message: 'Ngày bắt đầu không được nhỏ hơn hôm nay!',
          path: ['startDate'],
        });
      }
    }

    // Validate endDate if it's dirty
    if (isEndDateDirty) {
      if (!data.endDate || data.endDate.length < 1) {
        ctx.addIssue({
          code: zod.ZodIssueCode.invalid_date,
          message: 'Ngày kết thúc là bắt buộc!',
          path: ['endDate'],
        });
      }
    }

    // Validate that startDate is before endDate if either is dirty
    if (isStartDateDirty || isEndDateDirty) {
      if (!dayjs(data.startDate).isBefore(dayjs(data.endDate))) {
        ctx.addIssue({
          code: zod.ZodIssueCode.invalid_date,
          message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu!',
          path: ['endDate'],
        });
      }
    }

    return true; // If all checks pass
  });
