import type { ICourse } from 'src/types/course';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Paper, Stack, Button, Divider, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import SimpleImage from 'src/sections/_partials/simple-image';
import FeedbackBox from 'src/sections/_user/feedback/view/feedback-box';

type Props = {
  course: ICourse;
};
export default function TutorAdvDetailsView({ course }: Props) {
  return (
    <Container sx={{ pb: 10 }}>
      <SimpleImage
        src={course.thumbnail}
        alt={course.title}
        sx={{ width: 1, minHeight: 300, maxHeight: 400 }}
      />
      <CustomBreadcrumbs
        separator="/"
        sx={{
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
            name: course.title,
          },
        ]}
      />
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <Typography variant="h2" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Giáo viên: {course.fullname}
          </Typography>
          <Typography>{course.description}</Typography>
          <Typography variant="h3" gutterBottom>
            Đánh giá của học viên
          </Typography>
          <Box sx={{ mb: 2 }}>
            <FeedbackBox courseId={course.id} />
          </Box>
          <Stack>
            {course.feedbacks?.length ? (
              course.feedbacks.map((feedback) => (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{ textTransform: 'uppercase', fontWeight: 600, color: 'text.secondary' }}
                  >
                    {feedback.studentName}
                  </Typography>
                  <Typography variant="subtitle1">{feedback.message}</Typography>
                  <Typography
                    variant="overline"
                    sx={{ color: 'text.secondary', display: 'block', width: 1, textAlign: 'right' }}
                  >
                    {fDate(feedback.postDate)}
                  </Typography>
                  <Divider />
                </Box>
              ))
            ) : (
              <Typography sx={{ textAlign: 'center', textTransform: 'uppercase', my: 5 }}>
                Chưa có đánh giá về bài đăng này
              </Typography>
            )}
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, maxWidth: 400 }}>
            <Typography variant="h5" sx={{ textTransform: 'uppercase' }}>
              Thông tin bài đăng
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack
              spacing={1.5}
              sx={{
                position: 'relative',
              }}
            >
              {[
                {
                  value: course.daysPerMonth,
                  label: `Số ngày học:`,
                },
                {
                  value: course.course,
                  label: `Môn: `,
                },
                {
                  value: course.grade,
                  label: `Khối lớp:`,
                },
                {
                  value: `${fDate(course.startDate)} - ${fDate(course.endDate)}`,
                  label: `Kỳ học`,
                },
              ].map((item) => (
                <Stack
                  key={item.label}
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  sx={{ typography: 'body1' }}
                >
                  <strong>{item.label}</strong>
                  {item.value}
                </Stack>
              ))}
            </Stack>
            <Divider sx={{ mt: 2 }} />

            <Typography variant="h3" gutterBottom>
              <Box component="strong" sx={{ typography: 'h4', color: '#333' }}>
                Học phí:
              </Box>{' '}
              {fCurrency(course.fee)}
            </Typography>
            <Button variant="contained" color="primary" fullWidth size="large">
              Đăng ký ngay
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
