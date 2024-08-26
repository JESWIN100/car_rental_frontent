// src/components/UserProfile.js
import React, { useState } from 'react';

const BedforeDetails = () => {
  // State to manage visibility of the profile
  const [isVisible, setIsVisible] = useState(true);

  

  // Function to handle close button click
  const handleClose = () => {
    setIsVisible(false);
  };

  // Render nothing if the profile is not visible
  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-center min-h-screen bg-gray-100 p-6">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div className="flex items-center justify-center md:justify-start mb-6">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
          
        </div>
        
        
       
       
        
      </div>
    </div>
  );
};

export default BedforeDetails;
