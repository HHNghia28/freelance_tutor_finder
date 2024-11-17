import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { DashboardLayout } from 'src/layouts/dashboard';

import { SplashScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

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
const UpdateCoursePage = lazy(() => import('src/pages/user/my-course/update'));

const MyFavouritePage = lazy(() => import('src/pages/user/my-favourite/list'));

const ProfilePage = lazy(() => import('src/pages/profile'));

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
            path: 'ho-so',
            element: (
              <AuthGuard>
                <ProfilePage />
              </AuthGuard>
            ),
          },
          {
            path: 'bai-dang-cua-toi',
            element: (
              <AuthGuard>
                <Outlet />
              </AuthGuard>
            ),
            children: [
              { element: <MyCoursePage />, index: true },
              { path: 'bai-dang-moi', element: <CreateCoursePage /> },
              { path: ':id/cap-nhat', element: <UpdateCoursePage /> },
            ],
          },
          {
            path: 'yeu-thich',
            element: (
              <AuthGuard>
                <MyFavouritePage />
              </AuthGuard>
            ),
          },
        ],
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
