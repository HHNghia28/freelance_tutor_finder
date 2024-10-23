import { Navigate, useRoutes } from 'react-router-dom';

import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    // {
    //   path: '/',
    //   /**
    //    * Skip home page
    //    * element: <Navigate to={CONFIG.auth.redirectPath} replace />,
    //    */
    //   element: <Navigate to={paths.dashboard.root} replace />,
    // },

    // Auth
    ...authRoutes,

    // Dashboard
    ...dashboardRoutes,

    // Main
    ...mainRoutes,

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
