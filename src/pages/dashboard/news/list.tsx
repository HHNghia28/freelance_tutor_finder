import { Helmet } from 'react-helmet-async';

import { AccountListView } from 'src/sections/_admin/user/view/account-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Quản lí tin tức` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AccountListView />
    </>
  );
}
