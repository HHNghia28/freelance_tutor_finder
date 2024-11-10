import Grid from '@mui/material/Unstable_Grid2';

import { useGetCourses } from 'src/actions/course';

import CourseCard from 'src/sections/_partials/course-card';
import LoadingIndicate from 'src/sections/_partials/loading-indicate';

export default function TutorAdvList() {
  const { courses, coursesLoading } = useGetCourses();
  if (coursesLoading) return <LoadingIndicate />;
  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid xs={12} sm={6} md={4} key={course.id} sx={{}}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
}
