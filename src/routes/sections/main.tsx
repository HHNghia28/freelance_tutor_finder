import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SimpleLayout } from 'src/layouts/simple';
import { DashboardLayout } from 'src/layouts/dashboard';

import { SplashScreen } from 'src/components/loading-screen';

import { AuthGuard, RoleBasedGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const MaintenancePage = lazy(() => import('src/pages/maintenance'));
// Error
const Page500 = lazy(() => import('src/pages/error/500'));
const Page403 = lazy(() => import('src/pages/error/403'));
const Page404 = lazy(() => import('src/pages/error/404'));
// Tutor news
const TutorNewsListPage = lazy(() => import('src/pages/guest/news/list'));
const TutorNewsDetailsPage = lazy(() => import('src/pages/guest/news/details'));
// Tutor
const TutorAdvListPage = lazy(() => import('src/pages/guest/tutor-adv/list'));
const TutorAdvDetailsPage = lazy(() => import('src/pages/guest/tutor-adv/details'));
// USER
const TutorRegisterPage = lazy(() => import('src/pages/user/tutor/tutor-register'));
const MyCoursePage = lazy(() => import('src/pages/user/my-course/list'));
const CreateCoursePage = lazy(() => import('src/pages/user/my-course/create'));
const MyEventPage = lazy(() => import('src/pages/user/my-event/list'));
const CreateEventPage = lazy(() => import('src/pages/user/my-event/create'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        element: (
          <DashboardLayout isLanding>
            <Suspense fallback={<SplashScreen />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        ),
        children: [
          {
            path: 'tin-tuc-gia-su',
            children: [
              { element: <TutorNewsListPage />, index: true },
              { path: ':slug', element: <TutorNewsDetailsPage /> },
              // { path: ':id/edit', element: <UserEditPage /> },
            ],
          },
          {
            path: 'tim-gia-su',
            children: [
              { element: <TutorAdvListPage />, index: true },
              { path: ':slug', element: <TutorAdvDetailsPage /> },
              // { path: ':id/edit', element: <UserEditPage /> },
            ],
          },
          {
            path: 'dang-ky-lam-gia-su',
            element: (
              <AuthGuard>
                <TutorRegisterPage />
              </AuthGuard>
            ),
          },
          {
            path: 'khoa-hoc-cua-toi',
            element: (
              <AuthGuard>
                <Outlet />
              </AuthGuard>
            ),
            children: [
              { element: <MyCoursePage />, index: true },
              { path: 'khoa-hoc-moi', element: <CreateCoursePage /> },
            ],
          },
          {
            path: 'tin-tuc-cua-toi',
            element: (
              <AuthGuard>
                <RoleBasedGuard hasContent currentRole="Tutor">
                  <Outlet />
                </RoleBasedGuard>
              </AuthGuard>
            ),
            children: [
              { element: <MyEventPage />, index: true },
              { path: 'dang-tin-moi', element: <CreateEventPage /> },
            ],
          },
        ],
      },

      {
        path: 'maintenance',
        element: (
          <SimpleLayout content={{ compact: true }}>
            <MaintenancePage />
          </SimpleLayout>
        ),
      },
      {
        path: '500',
        element: <Page500 />,
      },
      {
        path: '404',
        element: <Page404 />,
      },
      {
        path: '403',
        element: <Page403 />,
      },
    ],
  },
];
