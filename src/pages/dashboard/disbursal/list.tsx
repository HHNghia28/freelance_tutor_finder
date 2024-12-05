import { Helmet } from 'react-helmet-async';

import { DisbursalListView } from 'src/sections/_admin/disbursal/view/disbursal-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Danh sách cần giải ngân` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DisbursalListView />
    </>
  );
}
