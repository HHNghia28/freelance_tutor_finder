import { Helmet } from 'react-helmet-async';

import MyEventCreateView from 'src/sections/_user/event/view/my-event-create-view';

// ----------------------------------------------------------------------

const metadata = { title: `Đăng tin mới` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <MyEventCreateView />
    </>
  );
}
