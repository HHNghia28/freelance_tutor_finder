import { Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import TutorList from '../tutor-list';

export default function TutorListView() {
  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Tìm gia sư
      </Typography>
      <TutorList />
    </DashboardContent>
  );
}
