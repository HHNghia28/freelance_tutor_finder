import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useGetTutorAdv } from 'src/actions/tutor-adv';

import MyCourseEditView from 'src/sections/_user/my-course/view/my-course-edit-view';

// ----------------------------------------------------------------------

const metadata = { title: `Cập nhật bài đăng` };

export default function Page() {
  const { id = '' } = useParams();
  const { tutorAdv, tutorAdvLoading, tutorAdvError } = useGetTutorAdv(id);
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <MyCourseEditView row={tutorAdv} loading={tutorAdvLoading} error={tutorAdvError} />
    </>
  );
}
