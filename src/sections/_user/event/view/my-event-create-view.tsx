import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import MyEventCreateEditForm from '../my-event-create-edit-form';

export default function MyEventCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Tin tức mới"
        separator="/"
        sx={{
          '& .MuiBreadcrumbs-ol': {
            columnGap: 0.5,
          },
        }}
        links={[
          {
            name: 'Tin tức của tôi',
            href: paths.user.my_event.list,
          },
          {
            name: 'Đăng tin mới',
          },
        ]}
      />
      <MyEventCreateEditForm />
    </DashboardContent>
  );
}
