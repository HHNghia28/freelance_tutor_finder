import { Box, Card, Button, CardHeader, Typography, CardContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { varAlpha } from 'src/theme/styles';

import { useAuthContext } from 'src/auth/hooks';

import FeedbackForm from '../feedback-form';

type Props = {
  courseId: string;
};
export default function FeedbackBox({ courseId }: Props) {
  const { user, unauthenticated } = useAuthContext();

  const isTutor = user?.role === 'Tutor';
  const loginRequired = (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundColor: (theme) => varAlpha(theme.palette.common.blackChannel, 0.2),
        backdropFilter: 'blur(2px)',
        alignContent: 'center',
        textAlign: 'center',
        zIndex: 1,
      }}
    >
      <Typography gutterBottom variant="subtitle1">
        Bạn cần phải đăng nhập để để lại đánh giá
      </Typography>
      <Button variant="contained" LinkComponent={RouterLink} href={paths.auth.jwt.signIn}>
        Đăng nhập
      </Button>
    </Box>
  );
  if (isTutor)
    return (
      <Card>
        <CardHeader title="Ý kiến của bạn về khóa học này" />
        <CardContent>
          <Typography>Bạn cần phải đăng kí khóa học này để đánh giá</Typography>
        </CardContent>
      </Card>
    );
  return (
    <Card sx={{ position: 'relative' }}>
      <CardHeader title="Ý kiến của bạn về khóa học này" />
      <CardContent>
        <FeedbackForm courseId={courseId} />
      </CardContent>
      {unauthenticated && loginRequired}
    </Card>
  );
}
