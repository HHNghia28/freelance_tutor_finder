import { Helmet } from 'react-helmet-async';

import { OrderListView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

const metadata = { title: `Quản lí thanh toán` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OrderListView />
    </>
  );
}
