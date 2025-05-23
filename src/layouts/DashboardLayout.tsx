import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  UsersIcon, 
  BriefcaseIcon,
  CalendarIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ClockIcon,
  UserIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  roles: string[];
}

const navigation: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon, roles: ['admin', 'employee'] },
  { name: 'My Profile', path: '/profile', icon: UserIcon, roles: ['admin', 'employee'] },
  { name: 'My Attendance', path: '/attendance', icon: ClockIcon, roles: ['admin', 'employee'] },
  { name: 'My Leave', path: '/my-leave', icon: CalendarIcon, roles: ['admin', 'employee'] },
  { name: 'My Documents', path: '/documents', icon: DocumentTextIcon, roles: ['admin', 'employee'] },
  { name: 'Employees', path: '/employees', icon: UsersIcon, roles: ['admin'] },
  { name: 'Jobs', path: '/jobs', icon: BriefcaseIcon, roles: ['admin'] },
  { name: 'Leave Management', path: '/leave', icon: CalendarIcon, roles: ['admin'] },
  { name: 'Settings', path: '/settings', icon: Cog6ToothIcon, roles: ['admin'] },
];

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // TODO: Replace this with actual user role from your authentication system
  const userRole = 'employee'; // This should come from your auth context/state
  const location = useLocation();

  const filteredNavigation = navigation.filter(item => item.roles.includes(userRole));

  const renderNavigation = (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {filteredNavigation.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            className={`group flex items-center rounded-md px-2 py-2 text-base font-medium ${
              isActive 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className={`mr-4 h-6 w-6 ${
              isActive ? 'text-gray-900' : 'text-gray-500'
            }`} />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-2xl font-bold text-gray-900">HR Manager</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          {renderNavigation}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-2xl font-bold text-gray-900">HR Manager</h1>
          </div>
          {renderNavigation}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
