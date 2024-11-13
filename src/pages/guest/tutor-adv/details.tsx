import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useGetTutorAdv } from 'src/actions/tutor-adv';

import { EmptyContent } from 'src/components/empty-content';

import LoadingIndicate from 'src/sections/_partials/loading-indicate';
import TutorAdvDetailsView from 'src/sections/_guest/tutor-adv/view/tutor-adv-details';

// ----------------------------------------------------------------------

const metadata = { title: `Xem gia sư` };

export default function Page() {
  const { slug = '' } = useParams();

  const { tutorAdv, tutorAdvLoading, tutorAdvEmpty } = useGetTutorAdv(slug);
  if (tutorAdvLoading) return <LoadingIndicate />;
  if (tutorAdvEmpty) return <EmptyContent title="Không tìm thấy khóa học này!" />;
  return (
    <>
      <Helmet>
        <title> {tutorAdv?.title || metadata.title}</title>
      </Helmet>
      <TutorAdvDetailsView tutorAdv={tutorAdv!} />
    </>
  );
}
