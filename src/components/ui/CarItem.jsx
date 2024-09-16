import React, { useState, useEffect } from 'react';
import { FuelIcon, Settings, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Heart } from 'lucide-react';
import { axiosInstance } from '../../config/axiosInstance';

const CarItem = ({ car, toggleWishlist, isInWishlist }) => {
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axiosInstance.get(`review/average-rating/${car._id}`, {
          withCredentials: true,
        });
        setAverageRating(response.data.averageRating);
        // Simulate a delay for showing the skeleton loader
        setTimeout(() => {
          setLoading(false);
        }, 2000); // 1 second delay
      } catch (error) {
        console.error('Error fetching average rating:', error);
        setLoading(false);
      }
    };

    fetchAverageRating();
  }, [car._id]);

  const displayRating = averageRating !== null ? averageRating : car.rating;

  return (
    <div className="car-item max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      {loading ? (
        // Custom Skeleton Loader
        <div className="p-4 animate-pulse">
          {/* Skeleton for Image */}
          <div className="bg-gray-500 h-48 w-full rounded-t-lg"></div>

          {/* Skeleton for Car Brand & Model */}
          <div className="mt-4">
            <div className="bg-gray-500 h-4 w-32 mb-2 rounded"></div>
            <div className="bg-gray-500 h-4 w-24 rounded"></div>
          </div>

          {/* Skeleton for Fuel, Transmission, and Capacity */}
          <div className="flex justify-between mt-4">
            <div className="bg-gray-500 h-4 w-16 rounded"></div>
            <div className="bg-gray-500 h-4 w-16 rounded"></div>
            <div className="bg-gray-500 h-4 w-16 rounded"></div>
          </div>

          {/* Skeleton for Price & Rating */}
          <div className="flex justify-between items-center mt-4">
            <div className="bg-gray-500 h-6 w-24 rounded"></div>
            <div className="bg-gray-500 h-6 w-12 rounded"></div>
          </div>

          {/* Skeleton for Button */}
          <div className="mt-4">
            <div className="bg-gray-500 h-10 w-full rounded-lg"></div>
          </div>
        </div>
      ) : (
        // Actual content once loading is false
        <>
          <div className="relative">
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-30"></div>
           <Heart
  onClick={() => toggleWishlist(car._id)}
  className={`absolute top-4 right-4 cursor-pointer transition-transform duration-300 ease-in-out ${
    isInWishlist(car._id) ? 'text-red-600 fill-red-600 scale-110' : 'text-gray-500 fill-gray-500'
  }`}
  size={26} // Adjust size if needed
/>

            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold">{car.brand}</h3>
              <p className="text-sm">{car.model}</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center text-gray-600 text-sm space-x-2">
                <span className="flex items-center">
                  <FuelIcon size={16} className="mr-1" />
                  {car.fuelType}
                </span>
                <span className="flex items-center">
                  <Settings size={16} className="mr-1" />
                  {car.transmission}
                </span>
                <span className="flex items-center">
                  <Users size={16} className="mr-1" />
                  {car.capacity} People
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="text-blue-600 text-xl font-bold">{car.pricePerDay}₹/day</div>
              <div className="flex items-center text-yellow-500">
                <FontAwesomeIcon icon={faStar} className="mr-1" />
                <span>{displayRating} / 5</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Link to={`/car/car-details/${car._id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors duration-300">
                  More Details
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CarItem;
