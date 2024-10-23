import { Helmet } from 'react-helmet-async';

import { UserListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

const metadata = { title: `Danh sách tài khoản` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserListView />
    </>
  );
}
