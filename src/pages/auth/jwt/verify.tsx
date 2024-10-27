import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { JwtVerifyView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

const metadata = { title: `Xác thực email` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JwtVerifyView />
    </>
  );
}
