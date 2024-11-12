import { Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { TutorRegisterForm } from '../tutor-register-form';

export default function TutorRegisterView() {
  return (
    <DashboardContent
      sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', maxWidth: 'lg' }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        Đăng kí trở thành gia sư
      </Typography>
      <TutorRegisterForm />
    </DashboardContent>
  );
}
