import type { IStudentInCourse } from 'src/types/tutor-adv';

import Autoplay from 'embla-carousel-autoplay';

import { Box, Paper, Avatar, Divider, Typography } from '@mui/material';

import { maxLine, varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { Carousel, useCarousel } from 'src/components/carousel';

type Props = {
  students: IStudentInCourse[];
};
export default function StudentRegisterList({ students }: Props) {
  const carousel = useCarousel(
    {
      slidesToShow: {
        xs: '80%',
        sm: 2,
        md: 4,
      },
      loop: true,
    },
    [Autoplay({ playOnInit: true, delay: 5000 })]
  );

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="h5">Học viên đăng ký ({students.length})</Typography>

      <Divider sx={{ mb: 2 }} />
      <Box sx={{ position: 'relative' }}>
        <Carousel carousel={carousel}>
          {students.map((student) => (
            <Box
              key={student.email}
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                width: 1,
                aspectRatio: '4/3',

                textAlign: 'center',
                borderRadius: 1,
                boxShadow: (theme) => `${theme.shadows[1]}`,
                my: 1,
                userSelect: 'none',
              }}
            >
              <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
                {student.gender === 'male' ? (
                  <Iconify icon="tabler:gender-male" color="deepskyblue" width={26} height={26} />
                ) : (
                  <Iconify icon="tabler:gender-femme" color="hotpink" width={26} height={26} />
                )}
              </Box>
              <Avatar
                src={student.photo}
                alt={student.fullname}
                sx={{
                  width: 70,
                  height: 70,
                  border: (theme) =>
                    `2px solid ${varAlpha(theme.palette.background.neutralChannel, 0.8)}`,
                }}
              />
              <Typography variant="h6" sx={{ ...maxLine({ line: 2 }) }} title={student.fullname}>
                {student.fullname}
              </Typography>
              <Typography variant="body2">{student.phoneNumber}</Typography>
              <Typography variant="body2">{student.email}</Typography>
              <Typography
                variant="caption"
                title={student.location}
                sx={{ ...maxLine({ line: 2 }), mt: 0.5 }}
              >
                {student.location}
              </Typography>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Paper>
  );
}
