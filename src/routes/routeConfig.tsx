import { lazy, Suspense } from 'react';
import { Login } from '../pages/auth/Login';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { TwoFactorAuth } from '../pages/auth/TwoFactorAuth';
import { ProtectedRoute } from './ProtectedRoute';
import type { RouteObject } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

// Lazy load components
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));
const Attendance = lazy(() => import('../pages/Attendance'));
const MyLeave = lazy(() => import('../pages/MyLeave'));
const Documents = lazy(() => import('../pages/Documents'));
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));

const LoadingFallback = (): ReactNode => <div>Loading...</div>;

const ProtectedComponent = ({ component: Component }: { component: React.ComponentType }) => {
  const { isAuthenticated } = useAuth();
  return (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Suspense fallback={<LoadingFallback />}>
        <Component />
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
    element: (
      <ProtectedRoute isAuthenticated={true}>
        <Suspense fallback={<LoadingFallback />}>
          <DashboardLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <ProtectedComponent component={Dashboard} />,
      },
      {
        path: 'profile',
        element: <ProtectedComponent component={Profile} />,
      },
      {
        path: 'attendance',
        element: <ProtectedComponent component={Attendance} />,
      },
      {
        path: 'my-leave',
        element: <ProtectedComponent component={MyLeave} />,
      },
      {
        path: 'documents',
        element: <ProtectedComponent component={Documents} />,
      },
    ],
  },
]; 