import { z as zod } from 'zod';

import { schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type EventSchemaType = zod.infer<typeof EventSchema>;

export const EventSchema = zod.object({
  title: zod.string().min(1, { message: 'Tiêu đề là bắt buộc!' }),
  description: zod.string().min(1, { message: 'Nội dung là bắt buộc!' }),
  createBy: zod.string().min(1, { message: 'Gia sư là bắt buộc!' }),
  thumbnail: schemaHelper.file({ message: { required_error: 'Bạn chưa chọn hình!' } }),
});
