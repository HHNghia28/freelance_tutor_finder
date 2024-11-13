import { Helmet } from 'react-helmet-async';

import PaymentListView from 'src/sections/_admin/payment/view/payment-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Quản lí thanh toán` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PaymentListView />
    </>
  );
}
