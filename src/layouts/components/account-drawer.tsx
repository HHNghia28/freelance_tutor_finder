import type { IconButtonProps } from '@mui/material/IconButton';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { AnimateAvatar } from 'src/components/animate';

import ChangePassword from 'src/sections/change-password';

import { AccountButton } from './account-button';
import { SignOutButton } from './sign-out-button';
import { useAuthContext } from '../../auth/hooks';

// ----------------------------------------------------------------------

export type AccountDrawerProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export function AccountDrawer({ data = [], sx, ...other }: AccountDrawerProps) {
  const theme = useTheme();

  const router = useRouter();

  const pathname = usePathname();

  const { user } = useAuthContext();

  const userInfo = user?.user;

  const [open, setOpen] = useState(false);

  const handleOpenDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickItem = useCallback(
    (path: string) => {
      handleCloseDrawer();
      console.log(path);
      router.push(path);
    },
    [handleCloseDrawer, router]
  );

  const showFormChangePassword = useBoolean();

  const renderAvatar = (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { src: userInfo?.photo, alt: userInfo?.userName },
        overlay: {
          border: 2,
          spacing: 3,
          color: `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0)} 25%, ${theme.vars.palette.primary.main} 100%)`,
        },
      }}
      sx={{ textTransform: 'uppercase' }}
    >
      {userInfo?.userName?.charAt(0)}
    </AnimateAvatar>
  );

  return (
    <>
      <AccountButton
        open={open}
        onClick={handleOpenDrawer}
        photoURL={userInfo?.photo || ''}
        displayName={userInfo?.email || ''}
        sx={sx}
        {...other}
      />
      <Drawer
        open={open}
        onClose={handleCloseDrawer}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        <IconButton
          onClick={handleCloseDrawer}
          sx={{ top: 12, left: 12, zIndex: 9, position: 'absolute' }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>

        <Scrollbar>
          <Stack alignItems="center" sx={{ pt: 8 }}>
            {renderAvatar}
            <Typography variant="subtitle1" noWrap sx={{ mt: 2 }}>
              {userInfo?.userName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }} noWrap>
              {userInfo?.email}
            </Typography>
          </Stack>

          <Stack
            sx={{
              py: 3,
              px: 2.5,
              borderTop: `dashed 1px ${theme.vars.palette.divider}`,
              borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
            }}
          >
            {data.map((option) => {
              const rootHref = pathname.includes('/dashboard') ? paths.dashboard.root : '/';

              return (
                <MenuItem
                  key={option.label}
                  onClick={() => {
                    if (option.label === 'Đổi mật khẩu') {
                      showFormChangePassword.onTrue();
                    } else handleClickItem(option.label === 'Trang chủ' ? rootHref : option.href);
                  }}
                  sx={{
                    py: 1,
                    color: 'text.secondary',
                    '& svg': { width: 24, height: 24 },
                    '&:hover': { color: 'text.primary' },
                  }}
                >
                  {option.icon}

                  <Box component="span" sx={{ ml: 2 }}>
                    {option.label}
                  </Box>

                  {option.info && (
                    <Label color="error" sx={{ ml: 1 }}>
                      {option.info}
                    </Label>
                  )}
                </MenuItem>
              );
            })}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <SignOutButton onClose={handleCloseDrawer} />
        </Box>
      </Drawer>
      <ChangePassword
        open={showFormChangePassword.value}
        onClose={showFormChangePassword.onFalse}
      />
    </>
  );
}
