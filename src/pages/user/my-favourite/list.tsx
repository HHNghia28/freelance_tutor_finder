import { Helmet } from 'react-helmet-async';

import MyFavouriteListView from 'src/sections/_user/my-favourite/view/my-favourite-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Bài đăng yêu thích` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <MyFavouriteListView />
    </>
  );
}
