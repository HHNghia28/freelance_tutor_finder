import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SimpleLayout } from 'src/layouts/simple';
import { DashboardLayout } from 'src/layouts/dashboard';
import { guestNavData } from 'src/layouts/config-nav-guest';

import { SplashScreen } from 'src/components/loading-screen';

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
const TutorListPage = lazy(() => import('src/pages/guest/tutor/list'));
const TutorDetailsPage = lazy(() => import('src/pages/guest/tutor/details'));
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
          <DashboardLayout data={{ nav: guestNavData }}>
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
              { element: <TutorListPage />, index: true },
              { path: ':slug', element: <TutorDetailsPage /> },
              // { path: ':id/edit', element: <UserEditPage /> },
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
      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
];
