import { Helmet } from 'react-helmet-async';

import MyCourseCreateView from 'src/sections/_user/my-course/view/my-course-create-view';

// ----------------------------------------------------------------------

const metadata = { title: `Bài đăng mới` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <MyCourseCreateView />
    </>
  );
}
