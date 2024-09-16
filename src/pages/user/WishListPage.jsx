import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from 'react-toastify';

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
    <div className="container mx-auto p-24">
      <h2 className="text-3xl font-bold mb-6">Your Car Wishlist</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(car => (
            car ? (
              <div key={car._id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <img 
                  src={car.image[0] || '/default-image.jpg'} 
                  alt={car.model || 'Car Image'} 
                  className="w-full h-32 object-contain" 
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {car.brand || 'Unknown Brand'} {car.model || 'Unknown Model'}
                  </h3>
                  <p className="text-gray-600 mb-2">Year: {car.year || 'N/A'}</p>
                  <p className="text-gray-600 mb-2">Mileage: {car.mileage || 'N/A'} km</p>
                  <p className="text-gray-600 mb-2">Fuel Type: {car.fuelType || 'N/A'}</p>
                  <p className="text-gray-600 mb-2">Transmission: {car.transmission || 'N/A'}</p>
                  <p className="text-lg font-bold">Price per day: ${car.pricePerDay || 'N/A'}</p>
                  
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}
    </div>
  );
}
