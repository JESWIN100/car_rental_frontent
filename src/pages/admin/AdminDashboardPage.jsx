import React, { useEffect, useState } from 'react';
import RevenueChart from '../../components/ui/adminUi/RevenueChart'; // Adjust the path as needed
import BookingsChart from '../../components/ui/adminUi/BookingChart'; // Adjust the path as needed
import { axiosInstance } from '../../config/axiosInstance';


export default function AdminDashboard() {
  const [totalCars, setTotalCars] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsResponse, bookingsResponse, usersResponse, reviewsResponse] = await Promise.all([
          axiosInstance.get('/admin/total',{withCredentials: true}),
          axiosInstance.get('/admin/totalBooking',{withCredentials: true}),
          axiosInstance.get('/admin/totalUsers',{withCredentials: true}),
          axiosInstance.get('/admin/totalReview',{withCredentials: true})
        ]);

        setTotalCars(carsResponse.data.total);
        setTotalBookings(bookingsResponse.data.total);
        setTotalUsers(usersResponse.data.total);
        setTotalReviews(reviewsResponse.data.total);
      } catch (error) {
        console.error("Error fetching data", error);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Car Rental Admin Dashboard</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'Total Cars', value: totalCars },
          { title: 'Total Bookings', value: totalBookings },
          { title: 'Total Users', value: totalUsers },
          { title: 'Total Revenue', value: totalReviews }
        ].map(({ title, value }) => (
          <div key={title} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-3xl mt-2">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      {/* <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          <li>New booking by John Doe for BMW X5</li>
          <li>New car added: Audi Q7</li>
          <li>Booking canceled: Booking #4567</li>
        </ul>
      </div> */}

      {/* Cars Overview */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
      </div> */}

      {/* Charts */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Bookings Over Time</h2>
          <BookingsChart />
        </div>
        
      </div> */}

      {/* Quick Access Links */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[
          { title: 'Manage Cars', description: 'Quick access to car management.', link: 'Go to Cars' },
          { title: 'Manage Bookings', description: 'Quick access to booking management.', link: 'Go to Bookings' },
          { title: 'View Reports', description: 'Access detailed reports and analytics.', link: 'View Reports' }
        ].map(({ title, description, link }) => (
          <div key={title} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-center mt-2">{description}</p>
            <button className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">{link}</button>
          </div>
        ))}
      </div> */}
    </div>
  );
}
