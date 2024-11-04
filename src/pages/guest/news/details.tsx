import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useGetEvent } from 'src/actions/event';

import { EmptyContent } from 'src/components/empty-content';

import LoadingIndicate from 'src/sections/_partials/loading-indicate';
import NewsDetailsView from 'src/sections/_guest/news/view/news-details';

// ----------------------------------------------------------------------

const metadata = { title: `Xem tin tức` };

export default function Page() {
  const { slug = '' } = useParams();
  const { event, eventLoading, eventEmpty } = useGetEvent(slug);
  if (eventLoading) return <LoadingIndicate />;
  if (eventEmpty) return <EmptyContent title="Không tìm thấy tin tức này!" />;

  return (
    <>
      <Helmet>
        <title> {event?.title || metadata.title}</title>
      </Helmet>
      <NewsDetailsView event={event!} />
    </>
  );
}
