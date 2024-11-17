import { z as zod } from 'zod';

import { MAX_FILE_SIZE } from 'src/config-global';

import { schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type TutorRegisterSchemaType = zod.infer<typeof TutorRegisterSchema>;

export const TutorRegisterSchema = zod.object({
  userId: zod.string().min(1, { message: 'userId is required!' }),
  selfIntroduction: zod.string().min(1, { message: 'Giới thiệu là bắt buộc!' }),
  teachingAchievement: zod.string().min(1, { message: 'Thành tựu là bắt buộc!' }),
  academicSpecialty: zod.string().min(1, { message: 'Điểm nổi bật là bắt buộc!' }),
  citizenId: zod.string().min(1, { message: 'CCCD/CMND là bắt buộc!' }),
  cvUrl: schemaHelper
    .file({ message: { required_error: 'Bạn chưa chọn CV!' } })
    .refine(
      (file: any) => (typeof file === 'string' ? true : file?.size <= MAX_FILE_SIZE),
      'File tối đa 10MB'
    )
    .refine((file: any) => file?.type === 'application/pdf', 'Chỉ chấp nhận file PDF'),
});
