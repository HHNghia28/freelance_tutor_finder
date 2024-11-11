import type { ICourse } from 'src/types/course';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Paper, Stack, Avatar, Divider, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Markdown } from 'src/components/markdown';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import SimpleImage from 'src/sections/_partials/simple-image';
import BriefTutorAdv from 'src/sections/_partials/brief-tutor-adv';
import FeedbackBox from 'src/sections/_user/feedback/view/feedback-box';

type Props = {
  course: ICourse;
};
export default function TutorAdvDetailsView({ course }: Props) {
  return (
    <Container sx={{ pb: 10 }}>
      <CustomBreadcrumbs
        separator="/"
        sx={{
          mb: 2,
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
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Paper sx={{ p: 2, borderRadius: 2 }} elevation={2}>
            <Stack direction="row" spacing={2}>
              <SimpleImage
                src={course.thumbnail}
                alt={course.title}
                sx={{ width: 1, maxWidth: 300, aspectRatio: '2/1' }}
              />
              <Box sx={{ py: 2 }}>
                <Typography variant="h2" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Giáo viên: {course.fullname}
                </Typography>
                <Box sx={{ my: 2 }}>
                  <BriefTutorAdv
                    studentCount={course.numberOfStudent}
                    feedbackCount={course.feedbacks?.length || 0}
                  />
                </Box>
                <Box>
                  {course.discount ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 0.5 }}>
                      <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 700 }}>
                        {fCurrency(course.fee * ((100 - course.discount) / 100))}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                      >
                        {fCurrency(course.fee)}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 700 }}>
                      {fCurrency(course.fee)}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h5">Thông tin khóa học</Typography>

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
          </Paper>

          <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h5">Mô tả</Typography>
            <Divider sx={{ mb: 2 }} />

            <Markdown children={course.description} />
          </Paper>
        </Grid>
        <Grid xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, maxWidth: 400, borderRadius: 2 }}>
            <Typography variant="h5">Giáo viên</Typography>

            <Divider sx={{ mb: 2 }} />

            <Stack direction="row" alignItems="center">
              <Avatar
                src={course.photo}
                alt={course.fullname}
                sx={{
                  width: 60,
                  height: 60,
                  border: (theme) =>
                    `2px solid ${varAlpha(theme.palette.background.neutralChannel, 0.8)}`,
                }}
              />
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                Giáo viên: {course.fullname}
              </Typography>
            </Stack>

            <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mt: 1 }}>
              {
                'Tiến sĩ Sinh học - Phó hiệu trưởng THPT chuyên Hà Tĩnh.\n- Hơn 20 năm kinh nghiệm trong nghiên cứu và giảng dạy môn Sinh.\n- Tác giả của 77 đầu sách và tài liệu tham khảo môn Sinh học.\n- Giáo viên bồi dưỡng HSG và có nhiều học sinh đạt HSG Quốc gia môn Sinh, là thủ khoa, á khoa khối B.'
              }
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Đánh giá của học viên ({course.feedbacks?.length || 0})
            </Typography>
            <Box sx={{ mb: 2 }}>
              <FeedbackBox courseId={course.id} />
            </Box>
            <Stack>
              {course.feedbacks?.length ? (
                course.feedbacks.map((feedback) => (
                  <Box sx={{ mb: 2 }} key={feedback.id}>
                    <Stack direction="row" alignItems="center">
                      <Avatar
                        src={feedback.studentName}
                        alt={feedback.studentName}
                        sx={{
                          width: 45,
                          height: 45,
                          border: (theme) =>
                            `2px solid ${varAlpha(theme.palette.background.neutralChannel, 0.8)}`,
                        }}
                      />
                      <Box sx={{ ml: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
                          <Label
                            color="default"
                            variant="inverted"
                            sx={{ width: 'fit-content', px: 3, py: 0, borderRadius: 999 }}
                          >
                            {course.fullname}
                          </Label>
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'text.secondary',
                            }}
                          >
                            {fDate(feedback.postDate)}
                          </Typography>
                        </Box>
                        <Typography variant="subtitle1" sx={{ pl: 1, mt: 0.5 }}>
                          {feedback.message}
                        </Typography>
                      </Box>
                    </Stack>

                    <Divider sx={{ mt: 2, mb: 3 }} />
                  </Box>
                ))
              ) : (
                <Typography sx={{ textAlign: 'center', textTransform: 'uppercase', my: 5 }}>
                  Chưa có đánh giá về bài đăng này
                </Typography>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
