import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const metadata = { title: `User list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <h1>user list</h1>
    </>
  );
}
