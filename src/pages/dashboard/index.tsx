import { Helmet } from 'react-helmet-async';

import { OverviewAnalyticsView } from 'src/sections/overview/analytics/view';

// ----------------------------------------------------------------------

const metadata = { title: `Thống kê chung` };

export default function OverviewAppPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OverviewAnalyticsView />
    </>
  );
}
