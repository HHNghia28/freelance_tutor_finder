import type * as event from 'src/types/event';

import { useForm } from 'react-hook-form';
import { useMemo, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { Divider, CardHeader } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { MAX_FILE_SIZE } from 'src/config-global';
import { updateCourse } from 'src/actions/course';
import { createEvent, updateEvent } from 'src/actions/event';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { EventSchema, type EventSchemaType } from 'src/sections/_user/event/form/event-schema';

import { useAuthContext } from 'src/auth/hooks';

import { uploadFile } from '../../../actions/upload';

type Props = {
  editRecord?: event.IEvent;
};
export default function EventCreateEditForm({ editRecord }: Props) {
  const isEdit = !!editRecord;
  const router = useRouter();
  const { user } = useAuthContext();
  const tutorId = user?.user?.id;
  const defaultValues = useMemo(
    () => ({
      title: editRecord?.title || '',
      description: editRecord?.description || '',
      createBy: editRecord?.createBy || tutorId || '',
      thumbnail: editRecord?.thumbnail || null,
    }),
    [editRecord, tutorId]
  );

  const methods = useForm<EventSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(EventSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, dirtyFields },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!isEdit) {
        const { thumbnail, ...rest } = data;

        const uploadRes = await uploadFile(thumbnail as File);
        await createEvent({
          ...rest,
          thumbnail: uploadRes.fileUrl,
        });
        toast.success('Đăng tin mới thành công!');
      } else {
        const { thumbnail, ...rest } = data;
        if (dirtyFields.thumbnail) {
          const uploadRes = await uploadFile(thumbnail as File);
          await updateEvent(editRecord.id, {
            ...rest,
            thumbnail: uploadRes.fileUrl,
          });
        } else {
          await updateCourse(editRecord.id, rest);
        }
        toast.success('Cập nhật tin tức thành công!');
      }
      reset();
      router.push(paths.dashboard.news.list);
    } catch (error) {
      console.error(error);
      toast.success('Đã có lỗi xảy ra!');
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('thumbnail', newFile, { shouldValidate: true, shouldDirty: true });
      }
    },
    [setValue]
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        <Card>
          <CardHeader title="Thông tin" subheader="Tiêu đề, nội dung,..." sx={{ mb: 3 }} />

          <Divider />

          <Stack spacing={3} sx={{ p: 3 }}>
            <Field.Text name="title" label="Tiêu đề" placeholder="Tiêu đề.." />
            <Box>
              <Typography>Nội dung</Typography>
              <Field.Editor name="description" placeholder="Nội dung.." />
            </Box>
            <Box>
              <Typography variant="subtitle2">Thumbnail</Typography>
              <Field.Upload
                name="thumbnail"
                sx={{ width: 1 }}
                maxSize={MAX_FILE_SIZE}
                onDrop={handleDrop}
                onRemove={() => setValue('thumbnail', null, { shouldValidate: true })}
              />
            </Box>
          </Stack>
        </Card>

        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          size="large"
          sx={{ ml: 'auto', minWidth: 200 }}
        >
          {isEdit ? 'Cập nhật' : 'Tạo mới'}
        </LoadingButton>
      </Stack>
    </Form>
  );
}
