import Autoplay from 'embla-carousel-autoplay';

import { Box } from '@mui/material';

import { Carousel, useCarousel } from 'src/components/carousel';

export default function TutorAdvSlides() {
  const carousel = useCarousel({ loop: true }, [Autoplay({ delay: 2000 })]);
  return (
    <Box sx={{ position: 'relative', mb: '-23%' }}>
      <Carousel carousel={carousel}>
        {[
          '/assets/images/home/slides/slide_1.jpg',
          '/assets/images/home/slides/slide_2.jpg',
          '/assets/images/home/slides/slide_3.jpg',
        ].map((item, index) => (
          <Box key={index} sx={{ height: '50%' }}>
            <Box component="img" src={item} alt={item} sx={{ width: 1 }} />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}
