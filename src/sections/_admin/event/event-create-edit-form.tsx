import type * as event from 'src/types/event';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { Divider, MenuItem, CardHeader } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useGetTutors } from 'src/actions/tutor';
import { createEvent, updateEvent } from 'src/actions/event';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { EventSchema } from './form/event-schema';
import { uploadFile } from '../../../actions/upload';

import type { EventSchemaType } from './form/event-schema';

type Props = {
  editRecord?: event.IEvent;
};
export default function EventCreateEditForm({ editRecord }: Props) {
  const isEdit = !!editRecord;
  const router = useRouter();
  const { tutors } = useGetTutors();

  const defaultValues = useMemo(
    () => ({
      title: editRecord?.title || '',
      description: editRecord?.description || '',
      createBy: editRecord?.createBy || '',
      thumbnail: editRecord?.thumbnail || null,
    }),
    [editRecord]
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

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

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
          await updateEvent(editRecord.id, data as any);
        }
        toast.success('Cập nhật tin tức thành công!');
      }
      reset();
      router.push(paths.dashboard.news.list);
    } catch (error) {
      console.error(error);
      toast.error('Đã có lỗi xảy ra!');
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
            <Field.Select name="createBy" label="Gia sư" placeholder="Gia sư..">
              {tutors.map((tutor) => (
                <MenuItem value={tutor.id}>{tutor.fullname}</MenuItem>
              ))}
            </Field.Select>

            <Box>
              <Typography variant="subtitle2">Thumbnail</Typography>
              <Field.Upload
                name="thumbnail"
                sx={{ width: 1 }}
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
