import { Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import TutorDetails from '../tutor-detais';

export default function TutorDetailsView() {
  return (
    <Container>
      <CustomBreadcrumbs
        separator="/"
        sx={{
          '& .MuiBreadcrumbs-ol': {
            columnGap: 0.5,
          },
        }}
        links={[
          {
            name: 'Tin tức gia sư',
            href: paths.guest.news.list,
          },
          {
            name: 'Lò luyện thi vào Harvard',
          },
        ]}
      />
      <Typography variant="h2" gutterBottom>
        Lò luyện thi vào Harvard
      </Typography>
      <Typography>
        Mỹ - Từ đầu kỳ nghỉ hè 2024, 7 đứa trẻ 11 tuổi từ Australia, Anh, Thụy Sĩ bay đến New York
        để gặp Jamie Beaton - một cố vấn đại học mà chúng tin sẽ giúp vào được Harvard.
      </Typography>
      <TutorDetails />
    </Container>
  );
}
