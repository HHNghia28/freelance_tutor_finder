import { z as zod } from 'zod';

import { MAX_FILE_SIZE } from 'src/config-global';

import { schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type TutorRegisterSchemaType = zod.infer<typeof TutorRegisterSchema>;

export const TutorRegisterSchema = zod.object({
  userId: zod.string().min(1, { message: 'userId is required!' }),
  title: zod.string().min(1, { message: 'Chức danh là bắt buộc!' }),
  faculty: zod.string().min(1, { message: 'Chuyên ngành là bắt buộc!' }),
  transportation: zod.string().min(1, { message: 'Phương tiện di chuyển là bắt buộc!' }),
  onlineTutor: zod.boolean(),
  selfIntroduction: zod.string().min(1, { message: 'Giới thiệu là bắt buộc!' }),
  teachingAchievement: zod.string().min(1, { message: 'Thành tựu là bắt buộc!' }),
  academicSpecialty: zod.string().min(1, { message: 'Điểm nổi bật là bắt buộc!' }),
  cvUrl: schemaHelper
    .file({ message: { required_error: 'Bạn chưa chọn CV!' } })
    .refine((file: any) => file?.size <= MAX_FILE_SIZE, 'File tối đa 10MB')
    .refine((file: any) => file?.type === 'application/pdf', 'Chỉ chấp nhận file PDF'),
  photo: schemaHelper.file({ message: { required_error: 'Hình đại diện là bắt buộc!' } }),
});
