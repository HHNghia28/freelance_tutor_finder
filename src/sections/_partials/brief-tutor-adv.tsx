import { Box, Divider, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

type Props = {
  feedbackCount: number;
  studentCount: number;
};
export default function BriefTutorAdv({ feedbackCount, studentCount }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, color: 'text.secondary' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5, alignItems: 'center' }}>
        <Iconify icon="mingcute:star-fill" sx={{ color: 'warning.main', mt: '-4px' }} />
        <Typography
          variant="h6"
          sx={{
            color: 'text.primary',
          }}
        >
          {feedbackCount || 0}
        </Typography>
        <Typography variant="body2" sx={{ display: 'inline' }}>
          đánh giá
        </Typography>
      </Box>
      <Divider flexItem orientation="vertical" sx={{ mx: 2 }} />
      <Typography variant="body2">
        <Typography
          variant="h6"
          sx={{
            color: 'text.primary',
            display: 'inline',
          }}
        >
          {studentCount}
        </Typography>{' '}
        học sinh
      </Typography>
    </Box>
  );
}
