import React from 'react';
import RevenueChart from '../../components/ui/adminUi/RevenueChart'; // Adjust the path as needed
import BookingsChart from '../../components/ui/adminUi/BookingChart'; // Adjust the path as needed

export default function AdminDashboard() {
  return (
    
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Car Rental Admin Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold">Total Cars</h2>
          <p className="text-3xl mt-2">120</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold">Active Bookings</h2>
          <p className="text-3xl mt-2">32</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold">Total Users</h2>
          <p className="text-3xl mt-2">540</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold">Total Revenue</h2>
          <p className="text-3xl mt-2">$75,000</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          <li>New booking by John Doe for BMW X5</li>
          <li>New car added: Audi Q7</li>
          <li>Booking canceled: Booking #4567</li>
        </ul>
      </div>

      {/* Cars Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Most Popular Cars</h2>
          <ul className="space-y-2">
            <li>1. Toyota Camry (12 rentals)</li>
            <li>2. Ford Mustang (9 rentals)</li>
            <li>3. Tesla Model 3 (8 rentals)</li>
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Cars Needing Maintenance</h2>
          <ul className="space-y-2">
            <li>BMW X5 - Maintenance due</li>
            <li>Tesla Model S - Mileage 15,000</li>
          </ul>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Bookings Over Time</h2>
          <BookingsChart />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Revenue Overview</h2>
          <RevenueChart />
        </div>
      </div>

      {/* Quick Access Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold">Manage Cars</h2>
          <p>Quick access to car management.</p>
          <button className="mt-4 bg-blue-500 text-white p-2 rounded">Go to Cars</button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold">Manage Bookings</h2>
          <p>Quick access to booking management.</p>
          <button className="mt-4 bg-blue-500 text-white p-2 rounded">Go to Bookings</button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold">View Reports</h2>
          <p>Access detailed reports and analytics.</p>
          <button className="mt-4 bg-blue-500 text-white p-2 rounded">View Reports</button>
        </div>
      </div>
    </div>
  );
}
