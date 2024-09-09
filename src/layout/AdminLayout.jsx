import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import AdminFooter from '../components/admin/AdminFooter';

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <div className="flex flex-grow">
        <div className="flex-grow p-4 ml-0 lg:ml-64 transition-all duration-300">
          {/* Main content area */}
          <Outlet />
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}
