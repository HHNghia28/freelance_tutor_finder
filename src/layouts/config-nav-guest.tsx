import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  booking: icon('ic-booking'),
  dashboard: icon('ic-dashboard'),
};

// ----------------------------------------------------------------------
export const guestNavData = [
  /**
   * Guest
   */
  {
    subheader: 'Người dùng',
    items: [
      { title: 'Tin tức', path: paths.guest.news.list, icon: ICONS.dashboard },
      { title: 'Gia sư', path: paths.guest.tutor.list, icon: ICONS.booking },
    ],
  },
];
