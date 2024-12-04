import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  file: icon('ic-file'),
};

// ----------------------------------------------------------------------

export const studentNavData = [
  /**
   * User
   */
  {
    subheader: 'Tài khoản',
    items: [
      {
        title: 'Yêu thích',
        path: paths.user.favorite,
        icon: <Iconify icon="solar:heart-bold" />,
      },
      {
        title: 'Đã đăng ký',
        path: paths.user.register,
        icon: <Iconify icon="basil:book-solid" />,
      },
    ],
  },
];
export const tutorNavData = [
  /**
   * Tutor
   */
  {
    subheader: 'Gia sư',
    items: [{ title: 'Bài viết của tôi', path: paths.user.my_course.list, icon: ICONS.file }],
  },
];
