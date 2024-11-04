import { z as zod } from 'zod';

import { MAX_FILE_SIZE } from 'src/config-global';

import { schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type EventSchemaType = zod.infer<typeof EventSchema>;

export const EventSchema = zod.object({
  title: zod.string().min(1, { message: 'Tên khóa học là bắt buộc!' }),
  description: zod.string().min(1, { message: 'Nội dung là bắt buộc!' }),
  createBy: zod.string().min(1, { message: 'createBy là bắt buộc!' }),
  thumbnail: schemaHelper
    .file({ message: { required_error: 'Bạn chưa chọn hình!' } })
    .refine((file: any) => file?.size <= MAX_FILE_SIZE, 'File tối đa 10MB'),
});
