import { Helmet } from 'react-helmet-async';

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
