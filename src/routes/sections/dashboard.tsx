import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

// Overview
const IndexPage = lazy(() => import('src/pages/dashboard'));
// Account
const AccountListPage = lazy(() => import('src/pages/dashboard/account/list'));
const AccountCreatePage = lazy(() => import('src/pages/dashboard/account/new'));
// News
const NewsListPage = lazy(() => import('src/pages/dashboard/news/list'));
const NewsCreatePage = lazy(() => import('src/pages/dashboard/news/new'));
// Payment
const PaymentListPage = lazy(() => import('src/pages/dashboard/payment/list'));
// Cv
const CvListPage = lazy(() => import('src/pages/dashboard/cv/list'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: '/',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'account',
        children: [
          { element: <AccountListPage />, index: true },
          { path: 'list', element: <AccountListPage /> },
          { path: 'new', element: <AccountCreatePage /> },
          // { path: ':id/edit', element: <UserEditPage /> },
        ],
      },
      {
        path: 'news',
        children: [
          { element: <NewsListPage />, index: true },
          { path: 'list', element: <NewsListPage /> },
          { path: 'new', element: <NewsCreatePage /> },
          // { path: ':id/edit', element: <UserEditPage /> },
        ],
      },

      {
        path: 'payment',
        element: <PaymentListPage />,
      },
      {
        path: 'cv',
        element: <CvListPage />,
      },
    ],
  },
];
