import type { ICourse } from 'src/types/course';

import { useForm } from 'react-hook-form';
import { useMemo, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { Divider, MenuItem, CardHeader } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { sortStringByNumbers } from 'src/utils/helper';

import { useGetGrades } from 'src/actions/grade';
import { MAX_FILE_SIZE } from 'src/config-global';
import { useGetSubjects } from 'src/actions/subject';
import { createCourse, updateCourse } from 'src/actions/course';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { CourseSchema } from './form/course-schema';
import { useAuthContext } from '../../../auth/hooks';
import { uploadFile } from '../../../actions/upload';
import { acceptOnlyNumber } from '../../../utils/input-strict';

import type { CourseSchemaType } from './form/course-schema';

type Props = {
  editRecord?: ICourse;
};
export default function MyCourseCreateEditForm({ editRecord }: Props) {
  const isEdit = !!editRecord;
  const router = useRouter();
  const { grades } = useGetGrades();
  const { subjects } = useGetSubjects();
  const { user } = useAuthContext();

  const defaultValues = useMemo(
    () => ({
      title: editRecord?.title || '',
      description: editRecord?.description || '',
      daysPerMonth: editRecord?.daysPerMonth || '',
      courseId: editRecord?.course || '',
      gradeId: editRecord?.grade || '',
      startDate: editRecord?.startDate || '',
      endDate: editRecord?.endDate || '',
      fee: editRecord?.fee || 0,
      thumbnail: editRecord?.thumbnail || null,
    }),
    [editRecord]
  );
  const gradeOptions = useMemo(() => {
    if (!grades.length) return [];
    return sortStringByNumbers(grades, (a, b) => ({
      a: a.name,
      b: b.name,
    }));
  }, [grades]);
  const methods = useForm<CourseSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(CourseSchema),
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
        await createCourse({
          ...rest,
          thumbnail: uploadRes.fileUrl,
          tutorId: user!.tutorId!,
        });
        toast.success('Tạo khóa học mới thành công!');
      } else {
        const { thumbnail, ...rest } = data;
        if (dirtyFields.thumbnail) {
          const uploadRes = await uploadFile(thumbnail as File);
          await updateCourse(editRecord.id, {
            ...rest,
            thumbnail: uploadRes.fileUrl,
          });
        } else {
          await updateCourse(editRecord.id, rest);
        }
        toast.success('Cập nhật khóa học thành công!');
      }
      reset();
      router.push(paths.user.my_course.list);
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
          <CardHeader title="Thông tin" subheader="Thông tin về khóa học" sx={{ mb: 3 }} />

          <Divider />

          <Stack spacing={3} sx={{ p: 3 }}>
            <Field.Text name="title" label="Tên khóa học" placeholder="Tên khóa học.." />
            <Field.Text
              multiline
              minRows={5}
              maxRows={10}
              name="description"
              label="Mô tả về khóa học"
              placeholder="Mô tả về khóa học.."
            />
            <Box>
              <Typography variant="subtitle2">Hình khóa học</Typography>
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
        <Card>
          <CardHeader
            title="Thiệt lập khóa học"
            subheader="Thiết lập học phí, kỳ học,.."
            sx={{ mb: 3 }}
          />

          <Divider />

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            >
              <Field.Text name="daysPerMonth" label="Số ngày học" placeholder="20 ngày/tháng.." />
              <Field.Text
                type="number"
                name="fee"
                label="Học phí"
                onKeyDown={acceptOnlyNumber}
                InputProps={{
                  endAdornment: 'VNĐ',
                }}
              />
              <Field.Select name="gradeId" label="Khối lớp">
                {gradeOptions.map((grade) => (
                  <MenuItem key={grade.id} value={grade.id}>
                    {grade.name}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Select name="courseId" label="Môn học">
                {subjects.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.DatePicker name="startDate" label="Ngày bắt đầu" reduceAnimations />
              <Field.DatePicker name="endDate" label="Ngày kết thúc" reduceAnimations />
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