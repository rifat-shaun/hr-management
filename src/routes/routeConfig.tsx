import { lazy, Suspense } from 'react';
import { Login } from '../pages/auth/Login';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { TwoFactorAuth } from '../pages/auth/TwoFactorAuth';
import { ProtectedRoute } from './ProtectedRoute';
import type { RouteObject } from 'react-router-dom';
import type { ReactNode } from 'react';

const Dashboard = lazy(() => import('../pages/Dashboard'));

const LoadingFallback = (): ReactNode => <div>Loading...</div>;

export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/2fa',
    element: <TwoFactorAuth />,
  },
];

export const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute isAuthenticated={false}>
        <Suspense fallback={<LoadingFallback />}>
          <Dashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
]; 