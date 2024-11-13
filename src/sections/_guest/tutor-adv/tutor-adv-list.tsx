import Grid from '@mui/material/Unstable_Grid2';

import { useGetTutorAdvs } from 'src/actions/tutor-adv';

import TutorAdvCard from 'src/sections/_partials/tutor-adv-card';
import LoadingIndicate from 'src/sections/_partials/loading-indicate';

export default function TutorAdvList() {
  const { tutorAdvs, tutorAdvsLoading } = useGetTutorAdvs();
  if (tutorAdvsLoading) return <LoadingIndicate />;
  return (
    <Grid container spacing={3}>
      {tutorAdvs.slice(0, 9).map((course) => (
        <Grid xs={12} sm={6} md={4} key={course.id} sx={{}}>
          <TutorAdvCard tutorAdv={course} />
        </Grid>
      ))}
    </Grid>
  );
}
