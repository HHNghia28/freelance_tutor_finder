import { useMemo } from 'react';

import { fTimestamp } from 'src/utils/format-time';

import { useGetTutorAdvs } from 'src/actions/tutor-adv';
import { DashboardContent } from 'src/layouts/dashboard';

import TutorAdvList from '../tutor-adv-list';
import TutorCarousel from '../tutor-carousel';
import TutorAdvBanner from '../tutor-adv-banner';
import TutorAdvSlides from '../tutor-adv-slides';
import TutorAdvDisplay from '../tutor-adv-display';

export default function TutorAdvListView() {
  const { tutorAdvs } = useGetTutorAdvs();
  const recentTutors = useMemo(
    () =>
      tutorAdvs.toSorted(
        (a, b) => (fTimestamp(b.updateDate) as any) - (fTimestamp(a.updateDate) as any)
      ),
    [tutorAdvs]
  );
  return (
    <>
      <TutorAdvSlides />
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* <Typography variant="h2" sx={{ mb: 2 }}>
          Tìm gia sư
        </Typography> */}
        <TutorAdvList />
        <TutorAdvBanner />
        <TutorCarousel />
        <TutorAdvDisplay data={recentTutors} title="Bài đăng gần đây" />
      </DashboardContent>
    </>
  );
}
