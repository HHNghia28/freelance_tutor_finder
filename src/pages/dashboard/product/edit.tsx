import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useGetProduct } from 'src/actions/product';

import { ProductEditView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

const metadata = { title: `Cập nhật tài khoản` };

export default function Page() {
  const { id = '' } = useParams();

  const { product } = useGetProduct(id);

  return (
    <>
      <Helmet>
        {/* <title> {`Cập nhật: ${product?.name || metadata.title}`}</title> */}
        <title> {metadata.title}</title>
      </Helmet>

      <ProductEditView product={product} />
    </>
  );
}
