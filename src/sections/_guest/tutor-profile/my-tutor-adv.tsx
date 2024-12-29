import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Typography } from '@mui/material';

import TutorAdvCard from 'src/sections/_partials/tutor-adv-card';

type Props = {
  data: any[];
};
export default function MyTutorAdv({ data }: Props) {
  return (
    <Paper elevation={2} sx={{ p: 1, borderRadius: 2 }}>
      <Typography variant="h3" sx={{ textTransform: 'uppercase' }} gutterBottom>
        Các khóa học của giáo viên
      </Typography>
      <Grid container spacing={3}>
        {data.map((course) => (
          <Grid xs={12} sm={6} md={4} key={course.id} sx={{}}>
            <TutorAdvCard tutorAdv={course} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
