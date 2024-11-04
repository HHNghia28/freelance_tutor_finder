import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import MyCourseCreateEditForm from '../my-course-create-edit-form';

export default function MyCourseCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Khóa học mới"
        separator="/"
        sx={{
          '& .MuiBreadcrumbs-ol': {
            columnGap: 0.5,
          },
        }}
        links={[
          {
            name: 'Khóa học của tôi',
            href: paths.user.my_course.list,
          },
          {
            name: 'Khóa học mới',
          },
        ]}
      />
      <MyCourseCreateEditForm />
    </DashboardContent>
  );
}
