import Autoplay from 'embla-carousel-autoplay';

import { Box, Paper, Avatar, Typography } from '@mui/material';

import { useGetTutors } from 'src/actions/tutor';

import { Carousel, useCarousel, CarouselArrowFloatButtons } from 'src/components/carousel';

export default function TutorCarousel() {
  const { tutors } = useGetTutors();
  const carousel = useCarousel(
    {
      slidesToShow: {
        xs: 2,
        sm: 3,
        md: 4,
        lg: 6,
      },
      loop: true,
    },
    [Autoplay({ playOnInit: true, delay: 5000 })]
  );

  return (
    <Paper>
      <Box sx={{ position: 'relative', mx: 2 }}>
        <Carousel carousel={carousel} sx={{ borderRadius: 2 }}>
          {tutors.map((tutor, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', py: 2 }}
            >
              <Avatar
                src={tutor.photo}
                alt={tutor.fullname}
                sx={{
                  width: 80,
                  height: 80,
                  border: (theme) => `4px solid ${theme.palette.common.white}`,
                  boxShadow: (theme) => theme.shadows[6],
                }}
              />
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontWeight: 500, mt: 0.5 }}
              >
                Giáo viên
              </Typography>
              <Typography variant="subtitle1">{tutor.fullname}</Typography>
            </Box>
          ))}
        </Carousel>

        <CarouselArrowFloatButtons {...carousel.arrows} options={carousel.options} />
      </Box>
    </Paper>
  );
}
