import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkMode from './ui/DarkMode';
import { toast } from 'react-toastify';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = false; // Replace with actual login check

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRentalDetailsClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("You are not logged in. Please log in first.");
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };

  return (
    <header className="bg-black bg-opacity-5 absolute top-0 left-0 right-0 shadow-lg z-20">
      <nav className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-blue-400">Morent</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium text-white">
          <li>
            <Link to="/" className="hover:text-blue-400">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-400">About us</Link>
          </li>
          <li>
            <Link to="/user/home" onClick={handleRentalDetailsClick}  className="hover:text-blue-400">Rental Details</Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-blue-400">Register</Link>
          </li>
          <li>
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">Log In</Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          <DarkMode />
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
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
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="bg-gray-50 p-4 space-y-4 text-gray-700 font-medium md:hidden">
          <li>
            <Link to="/" onClick={toggleMenu} className="block hover:text-blue-600">Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu} className="block hover:text-blue-600">About us</Link>
          </li>
          <li>
            <Link to="/user/home" onClick={handleRentalDetailsClick} className="block hover:text-blue-600">Rental Details</Link>
          </li>
          <li>
            <Link to="/signup" onClick={toggleMenu} className="block hover:text-blue-600">Register</Link>
          </li>
          <li>
            <Link to="/login" onClick={toggleMenu} className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">Log In</Link>
          </li>
        </ul>
      )}
    </header>
  );
}
