import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminLogout } from '../../services/adminApi';

export default function AdminHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out?')) {
      try {
        const response = await adminLogout();
        if (response) {
          toast.success(response.message || 'Logged out successfully');
          navigate('/'); // Redirect to login page
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Button to toggle sidebar on small screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:w-64 w-56 bg-gray-800 text-white shadow-lg z-40`}>
        <nav className="flex flex-col h-full py-4 px-6 space-y-4">
          <Link to="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded-md transition-colors" onClick={toggleSidebar}>Dashboard</Link>
          <Link to="/admin/users" className="hover:bg-gray-700 p-2 rounded-md transition-colors" onClick={toggleSidebar}>Manage Users</Link>
          <Link to="/admin/allbookings" className="hover:bg-gray-700 p-2 rounded-md transition-colors" onClick={toggleSidebar}>Manage Bookings</Link>
          <Link to="/admin/cars" className="hover:bg-gray-700 p-2 rounded-md transition-colors" onClick={toggleSidebar}>Manage Cars</Link>
          <Link to="/admin/review" className="hover:bg-gray-700 p-2 rounded-md transition-colors" onClick={toggleSidebar}>Manage Reviews</Link>
          <Link to="/admin/driverslist" className="hover:bg-gray-700 p-2 rounded-md transition-colors" onClick={toggleSidebar}>Manage Drivers</Link>
          <Link to="/admin/contactlist" className="hover:bg-gray-700 p-2 rounded-md transition-colors" onClick={toggleSidebar}>Manage Contact Us</Link>

          
          <button onClick={handleLogout} className="mt-auto hover:bg-red-600 p-2 rounded-md transition-colors">Logout</button>
        </nav>
      </div>

      {/* Overlay for mobile view */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
