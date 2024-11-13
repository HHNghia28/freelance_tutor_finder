import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import MyCourseCreateEditForm from '../my-course-create-edit-form';

export default function MyCourseCreateView() {
  return (
    <DashboardContent sx={{ maxWidth: 'md' }}>
      <CustomBreadcrumbs
        heading="Bài đăng mới mới"
        separator="/"
        sx={{
          '& .MuiBreadcrumbs-ol': {
            columnGap: 0.5,
          },
          mb: 2,
        }}
        links={[
          {
            name: 'Bài đăng của tôi',
            href: paths.user.my_course.list,
          },
          {
            name: 'Bài đăng mới',
          },
        ]}
      />
      <MyCourseCreateEditForm />
    </DashboardContent>
  );
}
