import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { useGetTutorAdvRegister } from 'src/actions/tutor-adv';

import { EmptyContent } from 'src/components/empty-content';

import TutorAdvCard from 'src/sections/_partials/tutor-adv-card';
import LoadingIndicate from 'src/sections/_partials/loading-indicate';

import { useAuthContext } from 'src/auth/hooks';

export default function CourseRegisterList() {
  const { user } = useAuthContext();

  const id = user?.studentId;

  const { tutorAdvs, tutorAdvsLoading, tutorAdvsEmpty } = useGetTutorAdvRegister(id);

  if (tutorAdvsLoading) return <LoadingIndicate />;
  if (tutorAdvsEmpty) return <EmptyContent title="Bạn chưa đăng ký khóa học nào" />;

  return (
    <Grid container spacing={3}>
      {tutorAdvs.map((course) => (
        <Grid xs={12} sm={6} md={4} key={course.id} sx={{}}>
          <Box sx={{ position: 'relative', height: 1 }}>
            <TutorAdvCard tutorAdv={course} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
