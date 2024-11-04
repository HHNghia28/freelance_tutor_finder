import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useGetEvent } from 'src/actions/event';

import { EmptyContent } from 'src/components/empty-content';

import LoadingIndicate from 'src/sections/_partials/loading-indicate';
import EventEditView from 'src/sections/_admin/event/view/event-edit-view';

// ----------------------------------------------------------------------

const metadata = { title: `Cập nhật tin tức` };

export default function Page() {
  const { id = '' } = useParams();

  const { event, eventLoading, eventEmpty } = useGetEvent(id);

  if (eventLoading) return <LoadingIndicate />;

  if (eventEmpty) return <EmptyContent title="Không tìm thấy tin tức này!" />;

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EventEditView event={event!} />
    </>
  );
}
