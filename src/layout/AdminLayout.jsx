import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { MENU_ITEMS } from '../constants/menu.js';
import { ROUTES } from '../constants/routes.js';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => {
    if (path === ROUTES.DASHBOARD) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const renderMenuItem = (item, level = 0) => {
    if (item.children) {
      return (
        <div key={item.label} className="mb-4">
          <div className="px-3 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
            {item.label}
          </div>
          {item.children.map((child) => renderMenuItem(child, level + 1))}
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`group block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
          isActive(item.path)
            ? 'bg-indigo-100 text-indigo-700 shadow-sm'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        } ${level > 0 ? 'ml-6' : ''}`}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="flex items-center">
          {item.icon && (
            <span className="mr-3 text-gray-400 group-hover:text-gray-600">
              {/* Icon would go here */}
            </span>
          )}
          {item.label}
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-20 px-4 bg-gradient-to-r from-indigo-600 to-blue-600">
            <h1 className="text-2xl font-bold text-white">PR TOOLS</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-8 space-y-2 overflow-y-auto">
            {MENU_ITEMS.map((item) => renderMenuItem(item))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Top bar */}
        <header className="bg-white shadow-lg border-b border-gray-200">
          <div className="flex items-center justify-between h-20 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-3 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || 'admin@prtools.com'}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8 bg-gray-50 min-h-[calc(100vh-5rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;