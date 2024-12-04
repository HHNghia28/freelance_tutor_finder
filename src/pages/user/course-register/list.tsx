import { Helmet } from 'react-helmet-async';

import CourseRegisterListView from 'src/sections/_user/course-register/view/course-register-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Khóa học đã đăng ký` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <CourseRegisterListView />
    </>
  );
}
