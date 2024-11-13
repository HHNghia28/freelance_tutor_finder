import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import EventCreateEditForm from '../event-create-edit-form';

export default function EventCreateView() {
  return (
    <DashboardContent sx={{ maxWidth: 'md' }}>
      <CustomBreadcrumbs
        heading="Tin tức mới"
        separator="/"
        sx={{
          mb: 2,
          '& .MuiBreadcrumbs-ol': {
            columnGap: 0.5,
          },
        }}
        links={[
          {
            name: 'Tin tức',
            href: paths.dashboard.news.list,
          },
          {
            name: 'Đăng tin mới',
          },
        ]}
      />
      <EventCreateEditForm />
    </DashboardContent>
  );
}
