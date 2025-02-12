import { Helmet } from 'react-helmet-async';

import { EventListView } from 'src/sections/_admin/event/view/event-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Quản lí tin tức` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EventListView />
    </>
  );
}
