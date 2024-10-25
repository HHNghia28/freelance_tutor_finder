import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import NewsDetailsView from 'src/sections/_guest/news/view/news-details';

// ----------------------------------------------------------------------

const metadata = { title: `Xem tin tức` };

export default function Page() {
  const { slug = '' } = useParams();

  //   const currentOrder = _orders.find((order) => order.id === id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <NewsDetailsView />
    </>
  );
}
