/* eslint-disable no-restricted-syntax */
import type { ITutorAdv } from 'src/types/tutor-adv';

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

import { sortStringByNumbers } from 'src/utils/helper';

import { payment } from 'src/actions/payment';
import { useGetGrades } from 'src/actions/grade';
import { useGetSubjects } from 'src/actions/subject';
import { createTutorAdv, updateTutorAdv } from 'src/actions/tutor-adv';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { CourseSchema } from './form/course-schema';
import { useAuthContext } from '../../../auth/hooks';
import { uploadFile } from '../../../actions/upload';
import { MultiFilePreview } from './form/preview-multi-file';
import { acceptOnlyNumber } from '../../../utils/input-strict';

import type { CourseSchemaType } from './form/course-schema';
/* ------------------------------------------- */
async function uploadVideos(freeCourses: any) {
  const freeCoursesRes: any = [];
  for (const course of freeCourses) {
    if (typeof course === 'string') {
      freeCoursesRes.push(course);
    } else {
      // eslint-disable-next-line no-await-in-loop
      const res = await uploadFile(course as File);
      freeCoursesRes.push(res.fileUrl);
    }
  }
  return freeCoursesRes;
}
/* ------------------------------------------- */
type Props = {
  editRecord?: ITutorAdv;
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
      courseId:
        editRecord?.course && subjects.length
          ? subjects.find((subject) => subject.name === editRecord.course)?.id
          : '',
      gradeId:
        editRecord?.grade && grades.length
          ? grades.find((grade) => grade.name === editRecord.grade)?.id
          : '',
      startDate: editRecord?.startDate || '',
      endDate: editRecord?.endDate || '',
      fee: editRecord?.fee || 0,
      discount: editRecord?.discount || 0,
      thumbnail: editRecord?.thumbnail || null,
      freeCourses: (editRecord?.freeCourses as any) || [],
      isStartDateDirty: !isEdit,
      isEndDateDirty: !isEdit,
    }),
    [editRecord, grades, subjects, isEdit]
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
    getValues,
    watch,
    handleSubmit,
    formState: { isSubmitting, dirtyFields },
  } = methods;
  const freeCoursesForm = watch('freeCourses');

  useEffect(() => {
    if (dirtyFields.startDate) {
      setValue('isStartDateDirty', true);
    }
    if (dirtyFields.endDate) {
      setValue('isEndDateDirty', true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirtyFields.startDate, dirtyFields.endDate]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!isEdit) {
        const { thumbnail, freeCourses, ...rest } = data;

        const freeCoursesRes = await Promise.all(
          freeCourses.map((course) => uploadFile(course as File))
        );
        const uploadRes = await uploadFile(thumbnail as File);
        const tutorAdvId = await createTutorAdv({
          ...rest,
          thumbnail: uploadRes.fileUrl,
          freeCourses: freeCoursesRes.map((free) => free.fileUrl),
          tutorId: user!.tutorId!,
        });
        toast.success('Tạo bài đăng mới thành công!');
        const href = await payment(tutorAdvId);
        window.location.href = href;
      } else {
        const { thumbnail, freeCourses, ...rest } = data as any;
        if (dirtyFields.thumbnail && dirtyFields.freeCourses) {
          const freeCoursesRes = await uploadVideos(freeCourses);
          const uploadRes =
            typeof thumbnail === 'string'
              ? { fileUrl: thumbnail }
              : await uploadFile(thumbnail as File);
          await updateTutorAdv(editRecord.id, {
            ...rest,
            thumbnail: uploadRes.fileUrl,
            freeCourses: freeCoursesRes,
          });
        } else if (dirtyFields.thumbnail) {
          const uploadRes = await uploadFile(thumbnail as File);
          await updateTutorAdv(editRecord.id, {
            ...rest,
            freeCourses,
            thumbnail: uploadRes.fileUrl,
          });
        } else if (dirtyFields.freeCourses) {
          const freeCoursesRes = await uploadVideos(freeCourses);

          await updateTutorAdv(editRecord.id, {
            ...rest,
            thumbnail,
            freeCourses: freeCoursesRes,
          });
        } else {
          await updateTutorAdv(editRecord.id, data as any);
        }
        toast.success('Cập nhật bài đăng thành công!');
      }
      reset();
      if (isEdit) {
        router.push(paths.user.my_course.list);
      }
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

  const handleDropVideos = useCallback(
    (acceptedFiles: File[]) => {
      const files = acceptedFiles;
      const filesOutput: File[] = [];
      files.forEach((file) => {
        const newFile = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });

        if (newFile) {
          filesOutput.push(newFile);
        }
      });

      setValue('freeCourses', filesOutput, { shouldValidate: true, shouldDirty: true });
    },
    [setValue]
  );
  const handleRemoveFile = useCallback(
    (file: any) => {
      const files: any = getValues('freeCourses');

      if (Array.isArray(files)) {
        const newFiles = files.filter((f) => f.path !== file.path || f !== file);

        setValue('freeCourses', newFiles, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    },
    [setValue, getValues]
  );
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        <Card>
          <CardHeader title="Thông tin" subheader="Thông tin về bài đăng" sx={{ mb: 3 }} />

          <Divider />

          <Stack spacing={3} sx={{ p: 3 }}>
            <Field.Text name="title" label="Tên bài đăng" placeholder="Tên bài đăng.." />
            <Field.Text
              multiline
              minRows={5}
              maxRows={10}
              name="description"
              label="Mô tả về bài đăng"
              placeholder="Mô tả về bài đăng.."
            />
            <Box>
              <Typography variant="subtitle2">Thumbnail</Typography>
              <Field.Upload name="thumbnail" sx={{ width: 1 }} onDrop={handleDrop} />
            </Box>
          </Stack>
        </Card>
        <Card>
          <CardHeader
            title="Thiết lập bài đăng"
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
              <Box>
                <Field.Text
                  type="number"
                  name="fee"
                  label="Học phí"
                  onKeyDown={acceptOnlyNumber}
                  InputProps={{
                    endAdornment: 'VNĐ',
                  }}
                  sx={{ width: '48%' }}
                />
                <Field.Text
                  type="number"
                  name="discount"
                  label="Giảm giá"
                  onKeyDown={acceptOnlyNumber}
                  InputProps={{
                    endAdornment: '%',
                  }}
                  sx={{ width: '48%', ml: 1 }}
                />
              </Box>
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
              <Field.DatePicker
                name="startDate"
                label="Ngày bắt đầu"
                disablePast
                reduceAnimations
              />
              <Field.DatePicker name="endDate" label="Ngày kết thúc" disablePast reduceAnimations />
            </Box>
          </Stack>
        </Card>
        <Card>
          <CardHeader
            title="Video bài giảng"
            subheader="Video giới thiệu về bài giảng"
            sx={{ mb: 3 }}
          />

          <Divider />

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box>
              <Typography variant="subtitle2">Video</Typography>
              <Field.Upload
                name="freeCourses"
                multiple
                accept={{
                  'video/*': [],
                }}
                onDrop={handleDropVideos}
                disabledPreview
              />
              <MultiFilePreview
                files={freeCoursesForm}
                onRemove={(event: any): void => {
                  console.log(event);
                  handleRemoveFile(event);
                }}
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
