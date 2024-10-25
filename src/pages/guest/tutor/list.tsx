import { Helmet } from 'react-helmet-async';

import TutorListView from 'src/sections/_guest/tutor/view/tutor-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tìm gia sư` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TutorListView />
    </>
  );
}
