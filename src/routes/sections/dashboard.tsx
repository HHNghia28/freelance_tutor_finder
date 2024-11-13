import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard, RoleBasedGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

// Account
const AccountListPage = lazy(() => import('src/pages/dashboard/account/list'));
// News
const NewsListPage = lazy(() => import('src/pages/dashboard/news/list'));
const NewsCreatePage = lazy(() => import('src/pages/dashboard/news/new'));
const NewsEditPage = lazy(() => import('src/pages/dashboard/news/edit'));
// Payment
const PaymentListPage = lazy(() => import('src/pages/dashboard/payment/list'));
// Cv
const CvListPage = lazy(() => import('src/pages/dashboard/cv/list'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <RoleBasedGuard hasContent currentRole="Admin">
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </RoleBasedGuard>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: '/dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <Navigate to="/dashboard/account" replace />, index: true },

      {
        path: 'account',
        children: [
          { element: <AccountListPage />, index: true },
          { path: 'list', element: <AccountListPage /> },
          // { path: ':id/edit', element: <UserEditPage /> },
        ],
      },
      {
        path: 'news',
        children: [
          { element: <NewsListPage />, index: true },
          { path: 'list', element: <NewsListPage /> },
          { path: 'new', element: <NewsCreatePage /> },
          { path: ':id/edit', element: <NewsEditPage /> },
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
