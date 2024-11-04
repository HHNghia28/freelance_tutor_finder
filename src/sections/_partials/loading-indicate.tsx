import { Stack, CircularProgress } from '@mui/material';

export default function LoadingIndicate() {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: 400 }}>
      <CircularProgress size={60} color="primary" />
    </Stack>
  );
}
