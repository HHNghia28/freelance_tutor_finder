import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useGetTutor } from 'src/actions/tutor';
import { useGetMyTutorAdv } from 'src/actions/tutor-adv';

import { EmptyContent } from 'src/components/empty-content';

import LoadingIndicate from 'src/sections/_partials/loading-indicate';
import TutorProfileView from 'src/sections/_guest/tutor-profile/view/tutor-profile-view';

// ----------------------------------------------------------------------

const metadata = { title: `Hồ sơ gia sư` };

export default function Page() {
  const { slug = '' } = useParams();

  const { tutorAdvs, tutorAdvsLoading } = useGetMyTutorAdv(slug, true);
  const { tutor, tutorLoading, tutorEmpty } = useGetTutor(slug);
  if (tutorAdvsLoading && tutorLoading) return <LoadingIndicate />;
  if (tutorEmpty) return <EmptyContent title="Không tìm thấy gia sư!" />;
  return (
    <>
      <Helmet>
        <title> {tutor?.fullname || metadata.title}</title>
      </Helmet>
      <TutorProfileView tutorAdvs={tutorAdvs!} tutor={tutor!} />
    </>
  );
}
