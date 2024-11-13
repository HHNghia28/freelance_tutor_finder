import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),

  user: icon('ic-user'),

  invoice: icon('ic-invoice'),
  menuItem: icon('ic-menu-item'),
  dashboard: icon('ic-dashboard'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Management
   */
  {
    subheader: 'Quản lí',
    items: [
      {
        title: 'Tài khoản',
        path: paths.dashboard.account.list,
        icon: ICONS.user,
        // children: [
        //   { title: 'Danh sách', path: paths.dashboard.account.list },
        // ],
      },
      {
        title: 'Tin tức',
        path: paths.dashboard.news.list,
        icon: ICONS.blog,
        children: [
          { title: 'Danh sách', path: paths.dashboard.news.list },
          { title: 'Tạo mới', path: paths.dashboard.news.new },
        ],
      },
      {
        title: 'Thanh toán',
        path: paths.dashboard.payment,
        icon: ICONS.invoice,
        // children: [
        //   { title: 'List', path: paths.dashboard.order.root },
        // ],
      },
      {
        title: 'Duyệt CV',
        path: paths.dashboard.cv,
        icon: ICONS.job,
        // children: [
        //   { title: 'List', path: paths.dashboard.order.root },
        // ],
      },
    ],
  },
];
