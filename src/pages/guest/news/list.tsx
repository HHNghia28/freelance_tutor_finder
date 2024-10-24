import { Helmet } from 'react-helmet-async';

import NewsListView from 'src/sections/_guest/news/view/news-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Gia sư - Tin tức mới nhất` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <NewsListView />
    </>
  );
}
