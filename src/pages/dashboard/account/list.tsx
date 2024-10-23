import { Helmet } from 'react-helmet-async';

import { ProductListView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

const metadata = { title: `Danh sách tài khoản` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductListView />
    </>
  );
}