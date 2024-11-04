import { Helmet } from 'react-helmet-async';

import MyCourseListView from 'src/sections/_user/my-course/view/my-course-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Khóa học của tôi` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <MyCourseListView />
    </>
  );
}
