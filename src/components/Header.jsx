import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkMode from './ui/DarkMode';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full shadow-md "> {/* Add your desired background color here */}
      <nav className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <div className="text-2xl font-bold">
          <Link to="/">Logo</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-600">
          <li>
            <Link to="/" className="hover:underline-offset-4">Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>About us</Link>
          </li>
          <li>
            <Link to="/rental-details">Rental Details</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login" className="btn btn-primary btn-sm">Log In</Link>
          </li>
        </ul>
        <div className="hidden md:flex items-center space-x-4">
          <DarkMode />
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
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
        <ul className="flex flex-col space-y-4 p-4 text-gray-600 md:hidden">
          <li>
            <Link to="/" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>About us</Link>
          </li>
          <li>
            <Link to="/rental-details" onClick={toggleMenu}>Rental Details</Link>
          </li>
          <li>
            <Link to="/register" onClick={toggleMenu}>Register</Link>
          </li>
          <li>
            <Link to="/login" className="btn btn-primary btn-sm" onClick={toggleMenu}>Log In</Link>
          </li>
        </ul>
      )}
    </header>
  );
}
