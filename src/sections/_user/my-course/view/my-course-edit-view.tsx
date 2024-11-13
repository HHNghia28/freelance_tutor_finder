import { Navigate } from 'react-router';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import MyCourseCreateEditForm from '../my-course-create-edit-form';

type Props = {
  row: any;
  loading: boolean;
  error: boolean;
};
export default function MyCourseEditView({ row, loading, error }: Props) {
  if (error) {
    return <Navigate to={paths.page404} />;
  }
  return (
    <DashboardContent sx={{ maxWidth: 'md' }}>
      <CustomBreadcrumbs
        heading="Chỉnh sửa bài đăng"
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
            name: row?.title,
          },
        ]}
        loading={loading}
      />
      <MyCourseCreateEditForm editRecord={row} />
    </DashboardContent>
  );
}
