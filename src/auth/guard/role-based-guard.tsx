import type { Theme, SxProps } from '@mui/material/styles';

import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ForbiddenIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

import { useAuthContext } from '../hooks';

import type { IRole } from '../../types/account';

// ----------------------------------------------------------------------

export type RoleBasedGuardProp = {
  sx?: SxProps<Theme>;
  currentRole: IRole;
  hasContent?: boolean;
  children: React.ReactNode;
};

export function RoleBasedGuard({ sx, children, hasContent, currentRole }: RoleBasedGuardProp) {
  const { user } = useAuthContext();

  if (user && currentRole !== user?.role) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Quyền truy cập bị từ chối
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Bạn không có quyền truy cập trang này!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
