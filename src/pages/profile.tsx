import { Helmet } from 'react-helmet-async';

import ProfileFormView from 'src/sections/profile/view/profile-form-view';

// ----------------------------------------------------------------------

const metadata = { title: `Hồ sơ của bạn` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ProfileFormView />
    </>
  );
}
