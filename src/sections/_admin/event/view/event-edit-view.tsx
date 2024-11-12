import type { IEvent } from 'src/types/event';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import EventCreateEditForm from '../event-create-edit-form';

type Props = {
  event: IEvent;
};
export default function EventEditView({ event }: Props) {
  return (
    <DashboardContent sx={{ maxWidth: 'md' }}>
      <CustomBreadcrumbs
        heading="Cập nhật tin tức"
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
            name: event.title,
          },
        ]}
      />
      <EventCreateEditForm editRecord={event} />
    </DashboardContent>
  );
}
