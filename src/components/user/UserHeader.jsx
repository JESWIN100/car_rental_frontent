import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkMode from '../ui/DarkMode';
import { userLogout } from '../../services/userApi';
import { toast } from 'react-toastify';
import logo from "../../assets/images/Morent-removebg-preview.png";
import { axiosInstance } from '../../config/axiosInstance';

export default function UserHeader() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user,setUser]=useState([])

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      console.log("response======>", response);

      if (response) {
        toast.success(response.message || 'Logged out successfully');
        navigate('/'); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('user/profile', {
          withCredentials: true,
        });
        setUser(response?.data?.data || {});
      } catch (error) {
        setError("Error fetching user profile.");
        console.log("Error fetching user profile:", error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);




  return (
    <header className=" absolute top-0 left-0 w-full bg-transparent  text-white shadow-md z-50 ">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="home" className="flex items-center">
            <img
              src={logo}
              alt="logo"
              className="h-12 w-auto"
            />
          </Link>
        </div>
        
        <button
          className="md:hidden block focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        <ul className="hidden md:flex space-x-8">
          <li><a href="#" className="font-semibold">Home</a></li>
          <li><a href="#how-it-work" className="font-semibold">How it Works</a></li>
          <li><a href="/car/carslist" className="font-semibold">Rental Cars</a></li>
          <li><a href="#why-choose-us" className="font-semibold">Why Choose Us</a></li>
          <li><a href="#testimonials" className="font-semibold">Testimonials</a></li>
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          <DarkMode />
          <div className="relative">
            <button
              className="w-10 h-10 rounded-full overflow-hidden focus:outline-none"
              onClick={toggleDropdown}
            >
              <img
                src={ user.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s" } 
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
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

        {isMenuOpen && (
          <ul className="absolute top-16 left-0 w-full shadow-lg rounded-b-lg md:hidden flex flex-col items-center space-y-4 py-4 text-white bg-black">
            <li><a href="#" className="font-semibold">Home</a></li>
            <li><a href="#how-it-work" className="font-semibold">How it Works</a></li>
            <li><a href="/car/carslist" className="font-semibold">Rental Cars</a></li>
            <li><a href="#why-choose-us" className="font-semibold">Why Choose Us</a></li>
            <li><a href="#testimonials" className="font-semibold">Testimonials</a></li>
            <li className="flex flex-col items-center space-y-4">
              <button
                className="btn btn-primary btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
