import type { ITutorAdv } from 'src/types/tutor-adv';

import { useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Box, Paper, Modal, Typography } from '@mui/material';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { Carousel, useCarousel, CarouselArrowFloatButtons } from 'src/components/carousel';

type Props = {
  data: ITutorAdv['freeCourses'];
};

export default function FreeCoursesList({ data }: Props) {
  const [view, setView] = useState<any>();

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
    <>
      <Paper elevation={3} sx={{ position: 'relative', p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Video giảng dạy
        </Typography>
        <Box sx={{ position: 'relative' }}>
          <Carousel carousel={carousel}>
            {data.map((freeCourse) => (
              <Box
                key={freeCourse}
                sx={{
                  width: 1,
                  height: 1,
                  cursor: 'pointer',
                  position: 'relative',
                  aspectRatio: '16/9',
                  '&:hover > #overlay': {
                    opacity: 1,
                  },
                }}
                onClick={() => setView(freeCourse)}
              >
                <Box
                  component="video"
                  sx={{
                    maxWidth: 1,
                    maxHeight: 1,
                    display: 'block',
                    width: 1,
                    height: 1,
                  }}
                >
                  <Box component="source" src={freeCourse} />
                </Box>
                <Box
                  id="overlay"
                  sx={{
                    opacity: 0,
                    position: 'absolute',
                    inset: 0,
                    background: (theme) => varAlpha(theme.palette.common.blackChannel, 0.4),
                    alignContent: 'center',
                    textAlign: 'center',
                    transition: (theme) => theme.transitions.create('opacity'),
                  }}
                >
                  <Iconify icon="heroicons-solid:play" color="white" width={50} height={50} />
                </Box>
              </Box>
            ))}
          </Carousel>

          <CarouselArrowFloatButtons {...carousel.arrows} options={carousel.options} />
        </Box>
      </Paper>
      <Modal
        open={!!view}
        onClose={() => setView('')}
        sx={{ alignContent: 'center' }}
        disableAutoFocus
      >
        <Box sx={{ maxWidth: 'lg', width: '90%', maxHeight: '90vh', mx: 'auto' }}>
          <Box
            component="video"
            // src={typeof view === 'string' ? view : (view as any)?.preview || ''}
            sx={{ width: 1, height: 1, display: 'block' }}
            controls
            autoPlay
          >
            <Box
              component="source"
              src={typeof view === 'string' ? view : (view as any)?.preview || ''}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
