import type { ICourse } from 'src/types/course';

import { Box, Link, Paper, Stack, Divider, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { pxToRem, varAlpha } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';

type Props = {
  course: ICourse;
};
export default function CourseCard({ course }: Props) {
  return (
    <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ position: 'relative' }}>
        <Image src={course.thumbnail} alt={course.title} ratio="5/3" />
      </Box>
      <Box sx={{ flex: 1, ml: 1 }}>
        <Typography
          variant="overline"
          sx={{ fontWeight: 900, fontSize: pxToRem(10), color: 'text.secondary' }}
        >
          {course.fullname}
        </Typography>
        <Link
          component={RouterLink}
          href={paths.guest.tutor.details(course.id)}
          variant="h4"
          sx={{ color: 'text.primary', display: 'block' }}
        >
          {course.title}
        </Link>
        <Typography variant="body1" sx={{ fontWeight: 600, color: 'secondary.main' }}>
          {fCurrency(course.fee)}
        </Typography>
        <Divider
          sx={{
            my: 2,
            border: (theme) => `1px dashed ${varAlpha(theme.palette.primary.mainChannel, 0.2)}`,
          }}
        />

        <Stack
          spacing={1.5}
          sx={{
            position: 'relative',
            p: (theme) => theme.spacing(0, 1.5, 1.5, 1.5),
          }}
        >
          {[
            {
              icon: <Iconify icon="solar:clock-circle-bold" sx={{ color: 'error.main' }} />,
              label: `Số ngày học: ${course.daysPerMonth}`,
            },
            {
              icon: <Iconify icon="flowbite:book-solid" sx={{ color: 'info.main' }} />,
              label: `Môn: ${course.course}`,
            },
            {
              icon: <Iconify icon="icon-park-solid:classroom" sx={{ color: 'primary.main' }} />,
              label: `Khối lớp: ${course.grade}`,
            },
            {
              icon: <Iconify icon="fa:calendar" sx={{ color: 'text.secondary' }} />,
              label: `Kỳ học: ${fDate(course.startDate)} - ${fDate(course.endDate)}`,
            },
          ].map((item) => (
            <Stack
              key={item.label}
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{ typography: 'body2' }}
            >
              {item.icon}
              {item.label}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
