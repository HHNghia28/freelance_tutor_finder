import Grid from '@mui/material/Unstable_Grid2';
import { Box, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { deleteCourse, useGetMyCourse } from 'src/actions/course';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import CourseCard from 'src/sections/_partials/course-card';
import LoadingIndicate from 'src/sections/_partials/loading-indicate';

import { useAuthContext } from 'src/auth/hooks';

export default function MyCourseList() {
  const { user } = useAuthContext();
  const isTutor = user?.role === 'Tutor';
  const id = isTutor ? user.tutorId : user?.studentId;

  const { courses, coursesLoading, coursesEmpty, coursesMutate } = useGetMyCourse(id, isTutor);
  const deleting = useBoolean();

  if (coursesLoading) return <LoadingIndicate />;
  if (coursesEmpty) return <EmptyContent title="Chưa có khóa học nào thuộc về bạn" />;
  const handleDelete = async (courseId: string) => {
    try {
      deleting.onTrue();
      await deleteCourse(courseId);

      coursesMutate();
      toast.success('Xóa khóa học thành công');
    } catch (error) {
      console.error(error);
      toast.success('Đã có lỗi xảy ra');
    } finally {
      deleting.onFalse();
    }
  };
  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid xs={12} sm={6} md={4} key={course.id} sx={{}}>
          <Box sx={{ position: 'relative' }}>
            <CourseCard course={course} />
            {isTutor && (
              <IconButton
                sx={{ position: 'absolute', top: 4, right: 4 }}
                size="small"
                onClick={() => {
                  handleDelete(course.id);
                }}
              >
                <Iconify
                  icon={deleting.value ? 'line-md:loading-loop' : 'clarity:remove-solid'}
                  color="error.main"
                />
              </IconButton>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
