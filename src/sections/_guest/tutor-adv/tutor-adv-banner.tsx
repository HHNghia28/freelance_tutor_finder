import Autoplay from 'embla-carousel-autoplay';

import { Box } from '@mui/material';

import { Carousel, useCarousel } from 'src/components/carousel';

export default function TutorAdvBanner() {
  const carousel = useCarousel(
    {
      slidesToShow: {
        xs: '70%',
        sm: 2,
        md: 3,
      },
      loop: true,
      slideSpacing: '16px',
    },
    [Autoplay({ delay: 8000 })]
  );
  return (
    <Box sx={{ position: 'relative', my: 5 }}>
      <Carousel carousel={carousel}>
        {[
          '/assets/images/home/banners/banner_1.jpg',
          '/assets/images/home/banners/banner_2.jpg',
          '/assets/images/home/banners/banner_3.jpg',
        ].map((item, index) => (
          <Box key={index} sx={{}}>
            <Box component="img" src={item} alt={item} sx={{ borderRadius: 1 }} />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}
