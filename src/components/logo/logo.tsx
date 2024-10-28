import type { BoxProps } from '@mui/material/Box';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';
import { Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';
import { useSettingsContext } from '../settings';

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  disableLink?: boolean;
  animate?: boolean;
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    { animate, width = 40, height = 40, disableLink = false, className, href = '/', sx, ...other },
    ref
  ) => {
    const settings = useSettingsContext();

    const isNavMini = settings.navLayout === 'mini';

    const logo = (
      <Typography variant={isNavMini ? 'h6' : 'h5'} sx={{ color: 'black' }}>
        {isNavMini || animate ? (
          <>
            Tutor <br /> Finder
          </>
        ) : (
          'TutorFinder'
        )}
      </Typography>
    );

    return (
      <NoSsr
        fallback={
          <Box
            width={width}
            height={height}
            className={logoClasses.root.concat(className ? ` ${className}` : '')}
            sx={{ flexShrink: 0, display: 'inline-flex', verticalAlign: 'middle', ...sx }}
          />
        }
      >
        <Box
          ref={ref}
          component={RouterLink}
          href={href}
          width={width}
          height={height}
          className={logoClasses.root.concat(className ? ` ${className}` : '')}
          aria-label="logo"
          sx={{
            flexShrink: 0,
            display: 'inline-flex',
            textDecoration: 'none',
            verticalAlign: 'middle',
            ...(disableLink && { pointerEvents: 'none' }),
            ...sx,
          }}
          {...other}
        >
          {logo}
        </Box>
      </NoSsr>
    );
  }
);
