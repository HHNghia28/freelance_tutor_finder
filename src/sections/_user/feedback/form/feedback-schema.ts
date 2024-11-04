import { z as zod } from 'zod';

// ----------------------------------------------------------------------

export type FeedbackSchemaType = zod.infer<typeof FeedbackSchema>;

export const FeedbackSchema = zod.object({
  tutorAdvertisementsId: zod.string().min(1, { message: 'Khóa học là bắt buộc!' }),
  studentId: zod.string().min(1, { message: 'Học sinh là bắt buộc!' }),
  message: zod.string().min(1, { message: 'Đánh giá là bắt buộc!' }),
});
