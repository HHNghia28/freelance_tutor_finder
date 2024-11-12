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
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
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
        icon: ICONS.order,
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
