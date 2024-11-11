import { useGetCourses } from 'src/actions/course';
import { DashboardContent } from 'src/layouts/dashboard';

import TutorAdvList from '../tutor-adv-list';
import TutorCarousel from '../tutor-carousel';
import TutorAdvBanner from '../tutor-adv-banner';
import TutorAdvSlides from '../tutor-adv-slides';
import TutorAdvDisplay from '../tutor-adv-display';

export default function TutorAdvListView() {
  const { courses } = useGetCourses();

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
        <TutorAdvDisplay data={courses} title="Bài đăng mới" />
      </DashboardContent>
    </>
  );
}
