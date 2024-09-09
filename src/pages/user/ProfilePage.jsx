import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-center min-h-screen bg-gray-100 p-6">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
        {/* Close Button with Link */}
        <Link to="/user/home" onClick={handleClose}>
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            aria-label="Close"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </Link>

        <div className="flex items-center justify-center md:justify-start mb-6">
          <img
            src={user.profileImage || "https://www.kindpng.com/picc/m/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
          />
          <div className="ml-6">
            <h2 className="text-3xl font-semibold text-gray-800">{user.name || "User Name"}</h2>
            <p className="text-gray-500">Member Since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h3>
          <p className="text-gray-600"><strong>Email:</strong> {user.email || "N/A"}</p>
          <p className="text-gray-600"><strong>Phone:</strong> {user.phone || "N/A"}</p>
          <p className="text-gray-600"><strong>Address:</strong> {user.address || "N/A"}</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
