import { Helmet } from 'react-helmet-async';

import { JwtUpdatePasswordView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

const metadata = { title: `Cập nhật mật khẩu mới` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JwtUpdatePasswordView />
    </>
  );
}
