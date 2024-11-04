import { Stack, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import MyEventList from '../my-event-list';

export default function MyEventListView() {
  return (
    <DashboardContent>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" sx={{ mb: 2 }}>
          Tin tức của tôi
        </Typography>
        <Button LinkComponent={RouterLink} href={paths.user.my_event.create} variant="contained">
          Đăng tin mới
        </Button>
      </Stack>
      <MyEventList />
    </DashboardContent>
  );
}
