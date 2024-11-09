import type { ICourse } from 'src/types/course';

import { Box, Link, Paper, Stack, Avatar, Divider, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { maxLine, varAlpha } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';

type Props = {
  course: ICourse;
};
export default function CourseCard({ course }: Props) {
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: (theme) => `1px solid ${varAlpha(theme.palette.grey['500Channel'], 0.12)}`,
      }}
    >
      <Stack direction="column">
        <Box sx={{ position: 'relative', flex: 1 }}>
          <Image src={course.thumbnail} alt={course.title} ratio="1/1" sx={{ width: 1 }} />
        </Box>
        <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Stack direction="row" minWidth={0} alignItems="center" justifyContent="space-between">
            <Typography variant="overline" sx={{ color: 'secondary.main' }}>
              {course.course} - {course.grade}
            </Typography>
            <Typography variant="h5" sx={{ flexShrink: 0 }}>
              {' '}
              {fCurrency(course.fee)}
            </Typography>
          </Stack>
          <Link
            component={RouterLink}
            href={paths.guest.tutor.details(course.id)}
            variant="h5"
            sx={{ color: 'text.primary', display: 'block', ...maxLine({ line: 2 }) }}
          >
            {course.title}
          </Link>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, color: 'text.secondary' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5, alignItems: 'center' }}>
              <Iconify icon="mingcute:star-fill" sx={{ color: 'warning.main', mt: '-4px' }} />
              <Typography
                variant="h6"
                sx={{
                  color: 'text.primary',
                }}
              >
                {course.feedbacks?.length || 0}
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
                50
              </Typography>{' '}
              học sinh
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
            <Avatar src="avatar" alt={course.fullname} />

            <Typography variant="body2">{course.fullname}</Typography>
          </Box>

          <Stack
            spacing={4}
            direction="row"
            sx={{
              position: 'relative',
              mt: 'auto',
            }}
          >
            {[
              {
                icon: <Iconify icon="mdi:clock-outline" sx={{ color: 'inherit' }} />,
                label: `Số ngày học:\n ${course.daysPerMonth}`,
              },

              {
                icon: <Iconify icon="fa:calendar" sx={{ color: 'inherit' }} />,
                label: `Kỳ học:\n ${fDate(course.startDate)} - ${fDate(course.endDate)}`,
              },
            ].map((item) => (
              <Stack
                key={item.label}
                spacing={1}
                direction="row"
                alignItems="center"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                {item.icon}
                {item.label}
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
