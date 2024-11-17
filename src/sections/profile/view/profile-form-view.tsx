import { Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { ProfileForm } from '../profile-form';

export default function ProfileFormView() {
  return (
    <DashboardContent
      sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', maxWidth: 'lg' }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        Hồ sơ của bạn
      </Typography>
      <ProfileForm />
    </DashboardContent>
  );
}
