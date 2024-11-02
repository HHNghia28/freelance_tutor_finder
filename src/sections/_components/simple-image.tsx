import type { SxProps } from '@mui/material';

import { useState } from 'react';

import { Box } from '@mui/material';

type Props = {
  src: string;
  alt: string;
  defaultSrc?: string;
  sx?: SxProps;
};
export default function SimpleImage({ sx, defaultSrc, src, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState<string>(src);

  const handleError = () => {
    setImgSrc(defaultSrc || '/assets/images/default-img.jpg');
  };
  return (
    <Box
      component="img"
      sx={{
        aspectRatio: '1/1',
        width: 80,
        display: 'block',
        ...sx,
      }}
      src={imgSrc}
      onError={handleError}
      {...props}
    />
  );
}
