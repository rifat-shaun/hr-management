import { lazy, Suspense } from 'react';
import { Login } from '../pages/auth/Login';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { TwoFactorAuth } from '../pages/auth/TwoFactorAuth';
import { ProtectedRoute } from './ProtectedRoute';
import type { RouteObject } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = lazy(() => import('../pages/Dashboard'));

const LoadingFallback = (): ReactNode => <div>Loading...</div>;

const ProtectedDashboard = () => {
  const { isAuthenticated } = useAuth();
  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Suspense fallback={<LoadingFallback />}>
        <Dashboard />
      </Suspense>
    </ProtectedRoute>
  );
};

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
    element: <ProtectedDashboard />,
  },
]; 