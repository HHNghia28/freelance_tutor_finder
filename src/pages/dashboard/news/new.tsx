import { Helmet } from 'react-helmet-async';

import EventCreateView from 'src/sections/_admin/event/view/event-create-view';

// ----------------------------------------------------------------------

const metadata = { title: `Đăng tin mới` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EventCreateView />
    </>
  );
}
