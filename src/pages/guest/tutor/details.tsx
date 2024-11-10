import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useGetCourse } from 'src/actions/course';

import { EmptyContent } from 'src/components/empty-content';

import LoadingIndicate from 'src/sections/_partials/loading-indicate';
import TutorAdvDetailsView from 'src/sections/_guest/tutor/view/tutor-adv-details';

// ----------------------------------------------------------------------

const metadata = { title: `Xem gia sư` };

export default function Page() {
  const { slug = '' } = useParams();

  const { course, courseLoading, courseEmpty } = useGetCourse(slug);
  if (courseLoading) return <LoadingIndicate />;
  if (courseEmpty) return <EmptyContent title="Không tìm thấy khóa học này!" />;
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <TutorAdvDetailsView course={course!} />
    </>
  );
}
