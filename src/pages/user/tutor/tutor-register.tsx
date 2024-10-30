import { Helmet } from 'react-helmet-async';

import TutorRegisterView from 'src/sections/_user/tutor-register/view/tutor-register-view';

// ----------------------------------------------------------------------

const metadata = { title: `Đăng kí trở thành gia sư` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <TutorRegisterView />
    </>
  );
}
