import { Navigate } from 'react-router';

import { Box, Stack, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { useAuthContext } from 'src/auth/hooks';

import CourseRegisterList from '../course-register-list';

export default function CourseRegisterListView() {
  const { user } = useAuthContext();
  const isStudent = user?.role === 'Student';
  if (!isStudent) return <Navigate to={paths.guest.tutor.list} />;
  return (
    <DashboardContent maxWidth="lg">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" sx={{ mb: 2 }}>
          Khóa học đã đăng ký
        </Typography>
      </Stack>
      <Box>
        <CourseRegisterList />
      </Box>
    </DashboardContent>
  );
}
