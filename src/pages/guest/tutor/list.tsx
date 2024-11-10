import { Helmet } from 'react-helmet-async';

import TutorAdvListView from 'src/sections/_guest/tutor/view/tutor-adv-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tìm gia sư` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TutorAdvListView />
    </>
  );
}
