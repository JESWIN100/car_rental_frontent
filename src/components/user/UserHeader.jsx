import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkMode from '../ui/DarkMode';
import { userLogout } from '../../services/userApi';
import { toast } from 'react-toastify'; // Ensure toast is imported
import logo from "../../assets/images/Morent-removebg-preview.png"
export default function UserHeader() {
  const navigate = useNavigate(); // Use navigate for redirection
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // API call
      const response = await userLogout();
      console.log("response======>", response);

      // Show success message
      if (response) {
        toast.success(response.message || 'Logged out successfully'); // Correctly access the message
        navigate('/'); // Redirect to login page
      }
    } catch (error) {
      // Handle errors
      toast.error(error.response?.data?.message || 'An error occurred');
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
          {/* Logo container with adjustment */}
          <Link to="/" className="flex items-center">
            <img
              src={logo} // Use the correct path here
              alt="logo"
              className="h-12 w-auto" // Adjust the height and make width automatic
            />
          </Link>
        </div>
        
        {/* Mobile menu button */}
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

        {/* Desktop navigation */}
        <ul className="hidden md:flex space-x-8">
          <li><a href="#" className="font-semibold">Home</a></li>
          <li><a href="#" className="font-semibold">How it Works</a></li>
          <li><a href="#" className="font-semibold">Rental Details</a></li>
          <li><a href="#" className="font-semibold">Why Choose Us</a></li>
          <li><a href="#" className="font-semibold">Testimonials</a></li>
        </ul>

        {/* Authentication buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <DarkMode />
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Link to={"/profile"}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"
              alt="User Avatar"
            />
            </Link>
            
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <ul className="absolute top-16 left-0 w-full shadow-lg rounded-b-lg md:hidden flex flex-col items-center space-y-4 py-4">
            <li><a href="#" className="font-semibold">Home</a></li>
            <li><a href="#" className="font-semibold">How it Works</a></li>
            <li><a href="#" className="font-semibold">Rental Details</a></li>
            <li><a href="#" className="font-semibold">Why Choose Us</a></li>
            <li><a href="#" className="font-semibold">Testimonials</a></li>
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
