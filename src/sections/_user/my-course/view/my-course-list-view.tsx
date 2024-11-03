import { Stack, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { useAuthContext } from 'src/auth/hooks';

import MyCourseList from '../my-course-list';

export default function MyCourseListView() {
  const { user } = useAuthContext();
  const isTutor = user?.role === 'Tutor';

  return (
    <DashboardContent>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" sx={{ mb: 2 }}>
          Khóa học của tôi
        </Typography>
        <Button LinkComponent={RouterLink} href={paths.user.my_course.create} variant="contained">
          Tạo khóa học
        </Button>
      </Stack>
      <MyCourseList />
    </DashboardContent>
  );
}
