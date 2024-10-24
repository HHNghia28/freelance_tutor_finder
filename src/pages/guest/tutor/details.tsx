import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import TutorDetailsView from 'src/sections/_guest/tutor/view/tutor-details';

// ----------------------------------------------------------------------

const metadata = { title: `Xem gia sư` };

export default function Page() {
  const { slug = '' } = useParams();

  //   const currentOrder = _orders.find((order) => order.id === id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <TutorDetailsView />
    </>
  );
}
