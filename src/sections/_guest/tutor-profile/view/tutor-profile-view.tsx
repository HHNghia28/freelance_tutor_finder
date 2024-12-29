import type { ITutorAdv } from 'src/types/tutor-adv';
import type { ITutorDetails } from 'src/types/tutor';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Paper, Stack, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import SimpleImage from 'src/sections/_partials/simple-image';

import MyTutorAdv from '../my-tutor-adv';

type Props = {
  tutorAdvs: ITutorAdv[];
  tutor: ITutorDetails;
};
export default function TutorProfileView({ tutorAdvs, tutor }: Props) {
  return (
    <Container sx={{ pb: 10 }}>
      <CustomBreadcrumbs
        separator="/"
        sx={{
          mb: 2,
          '& .MuiBreadcrumbs-ol': {
            columnGap: 0.5,
          },
        }}
        links={[
          {
            name: 'Tìm gia sư',
            href: paths.guest.tutor.list,
          },
          {
            name: `Gia sư: ${tutor?.fullname}`,
          },
        ]}
      />
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Paper sx={{ p: 2, borderRadius: 2 }} elevation={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <SimpleImage
                src={tutor?.photo}
                alt={tutor?.fullname}
                sx={{ width: 1, height: 1, maxWidth: 200 }}
              />
              <Box sx={{ py: 2 }}>
                <Typography variant="h3" gutterBottom>
                  Giáo viên: {tutor?.fullname}
                </Typography>

                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mt: 1 }}>
                  {tutor?.selfIntroduction}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid xs={12}>
          <MyTutorAdv data={tutorAdvs} />
        </Grid>
      </Grid>
    </Container>
  );
}
