import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function WishListPage() {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = user._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('user/profile', {
          withCredentials: true,
        });
        setUser(response?.data?.data || {});
        console.log("fetchUser", response.data.data);
      } catch (error) {
        setError("Error fetching user profile.");
        console.log("Error fetching user profile:", error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return; // Avoid fetching wishlist if userId is not available

    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get(`/Whishlist/getWhish/${userId}`, {
          withCredentials: true,
        });
        setWishlist(response?.data?.cars || []);
        console.log(response.data.cars);
      } catch (error) {
        setError("Error fetching wishlist.");
        console.error("Error fetching wishlist", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [userId]);

  return (
    <div className="container mx-auto p-8 lg:p-12">
      <h2 className="text-4xl font-bold mb-8 text-center">Your Car Wishlist</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 animate-pulse">Loading your wishlist...</p>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : wishlist.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <img 
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg" 
            alt="No Data" 
            className="max-w-xs"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(car => (
            car ? (
              <div key={car._id} className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                <img 
                  src={car.image[0] || '/default-image.jpg'} 
                  alt={car.model || 'Car Image'} 
                  className="w-full h-40 object-contain p-4"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {car.brand || 'Unknown Brand'} {car.model || 'Unknown Model'}
                  </h3>
                  <p className="text-gray-600 mb-2">Year: {car.year || 'N/A'}</p>
                  <p className="text-gray-600 mb-2">Mileage: {car.mileage || 'N/A'} km</p>
                  <p className="text-gray-600 mb-2">Fuel Type: {car.fuelType || 'N/A'}</p>
                  <p className="text-gray-600 mb-2">Transmission: {car.transmission || 'N/A'}</p>
                  <p className="text-lg font-bold">Price per day: ₹{car.pricePerDay || 'N/A'}</p>
                </div>
                <div className="p-4">
                  <Link to={`/car/car-details/${car._id}`}>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all duration-300">
                      More Details
                    </button>
                  </Link>
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}
    </div>
  );
}
