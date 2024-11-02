import { Helmet } from 'react-helmet-async';

import { AccountListView } from '../../../sections/_admin/user/view/account-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Danh sách tài khoản` };

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
