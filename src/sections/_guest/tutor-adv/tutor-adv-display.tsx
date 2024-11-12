import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Typography } from '@mui/material';

import TutorAdvCard from 'src/sections/_partials/tutor-adv-card';

type Props = {
  title: string;
  data: any[];
};
export default function TutorAdvDisplay({ title, data }: Props) {
  return (
    <Paper elevation={2} sx={{ p: 1, mt: 5 }}>
      <Typography variant="h3" sx={{ textTransform: 'uppercase' }} gutterBottom>
        {title}
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
