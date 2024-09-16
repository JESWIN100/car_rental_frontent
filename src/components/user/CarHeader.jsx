import React, { useEffect, useState } from 'react';
import { Heart, Bell, House } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { searchCar } from '../../services/carsApi';
import DarkMode from '../ui/DarkMode';
import { fetchBookings } from '../../services/bookingApi';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { userLogout } from '../../services/userApi';

export default function CarHeader() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkForNewBooking = async () => {
      const booking = await fetchBookings(); // Replace with the actual API call
      if (booking) {
        setHasNotification(true);
        setNotificationMessage('You have a new booking!');
      }
      else {
        setHasNotification(false);
      }
    };
    checkForNewBooking();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await searchCar(data);
      if (response) {
        toast.success(response.message); // Correctly access the message
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during the search");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleLogout =async () => {
    try {
      const response = await userLogout();
      console.log("response======>", response);

      if (response) {
        toast.success(response.message || 'Logged out successfully');
        navigate('/'); // Redirect to login page
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
      console.error(error);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {hasNotification ? notificationMessage : 'No new bookings'}
    </Tooltip>
  );

  return (
    <header className="p-5 flex justify-center items-center border-b border-gray-200">
      {/* Logo Section */}
      <div className="logo mr-4">
        <Link to={'/car/carslist'}>
          <h2 className="text-xl font-semibold cursor-pointer" aria-label="Morent">Morent</h2>
        </Link>
      </div>

      {/* Search Bar */}
      <form className="search-bar flex-grow mx-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Search something here"
          className="p-2 border rounded-lg border-gray-300 w-full md:w-96"
          aria-label="Search"
          {...register("model", { required: true })} 
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ml-2"
          aria-label="Search"
        >
          Search
        </button>
      </form>

      {/* Navbar Icons */}
      <div className="navbar-icons flex items-center space-x-4 ml-4">
        <div className='w-10 pt-2'>
          <DarkMode />
        </div>
       
        <Link to={'/car/wishlist'}>
          <Heart size={24} color="#FF69B4" className="text-gray-600 cursor-pointer" />
        </Link>
        
        <OverlayTrigger
          placement="bottom"
          overlay={renderTooltip}
        >
          <div className="relative">
            <Bell 
              size={24} 
              className={`cursor-pointer ${hasNotification ? 'text-red-600' : 'text-gray-600'}`}
              aria-label="Notifications"
            />
            {hasNotification && <span className="absolute top-0 right-0 block h-2 w-2 bg-red-600 rounded-full" />}
          </div>
        </OverlayTrigger>
{/* 
        <Link to={'/user/home'}>
          <House />
        </Link> */}

        {/* Avatar Group */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="w-10 h-10 rounded-full overflow-hidden focus:outline-none"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
              aria-controls="dropdown-menu"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>
            {isDropdownOpen && (
              <div id="dropdown-menu" className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                <Link to="/user/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                <Link to="/car/bookinglist" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Bookings</Link>
                <button
                  className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200 text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
