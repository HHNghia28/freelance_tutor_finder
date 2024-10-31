import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const _account = [
  {
    label: 'Trang chủ',
    href: '/',
    icon: <Iconify icon="solar:home-angle-bold-duotone" />,
  },

  {
    label: 'Đổi mật khẩu',
    href: '#',
    icon: <Iconify icon="solar:shield-keyhole-bold-duotone" />,
  },
  {
    label: 'Đăng ký làm gia sư',
    href: paths.user.tutor_register,
    icon: <Iconify icon="zondicons:education" />,
  },
];
