import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import AdminFooter from '../components/admin/AdminFooter';

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <AdminHeader />
        <div className="flex-grow ml-64 p-4">
          {/* Main content area */}
          <Outlet />
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}
