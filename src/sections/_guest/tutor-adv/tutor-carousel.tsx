import Autoplay from 'embla-carousel-autoplay';

import { Box, Paper, Avatar, Typography } from '@mui/material';

import { Carousel, useCarousel, CarouselArrowFloatButtons } from 'src/components/carousel';

export default function TutorCarousel() {
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
          {[...Array(10)].map((item, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', py: 2 }}
            >
              <Avatar
                src="aa"
                alt="A"
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
              <Typography variant="subtitle1">[Tên gia sư]</Typography>
            </Box>
          ))}
        </Carousel>

        <CarouselArrowFloatButtons {...carousel.arrows} options={carousel.options} />
      </Box>
    </Paper>
  );
}
