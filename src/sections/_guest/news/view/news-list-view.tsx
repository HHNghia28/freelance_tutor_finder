import { Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import NewsList from '../news-list';

export default function NewsListView() {
  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Gia sư
      </Typography>
      <NewsList />
    </DashboardContent>
  );
}
