import { Helmet } from 'react-helmet-async';

import { CVListView } from 'src/sections/_admin/cv/view/cv-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Duyệt CV` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CVListView />
    </>
  );
}
