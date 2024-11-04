import { Helmet } from 'react-helmet-async';

import MyEventListView from 'src/sections/_user/event/view/my-event-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tin tức của tôi` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <MyEventListView />
    </>
  );
}
