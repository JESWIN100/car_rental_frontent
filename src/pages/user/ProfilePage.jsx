import React, { useEffect, useState, useRef } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Ensure react-toastify is set up correctly for notifications
import { ImageDown } from 'lucide-react';

const UserProfile = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const fileInputRef = useRef(null); // Ref for file input

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('user/profile', {
          withCredentials: true,
        });
        setUser(response?.data?.data || {});
        console.log(response?.data?.data);
        
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

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (!imageFile) {
      toast.error('No image selected.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await axiosInstance.put(`/user/updateUser/${user._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      toast.success(response.data.message);
      setUser(prevState => ({ ...prevState, image: response.data.data.image }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile image.');
      console.error('Error updating profile image:', error);
    }
  };

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
    <div className="flex flex-col md:flex-row justify-center items-start md:items-center min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-6">
  <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl p-8">
    {/* Close Button with Link */}
    <Link to="/user/home" onClick={handleClose}>
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-transform transform hover:scale-110 duration-300"
        aria-label="Close"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </Link>

    <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
      <div className="relative group">
        <img
          src={
            user.image ||
            "https://www.kindpng.com/picc/m/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png"
          }
          alt="Profile"
          className="w-36 h-36 rounded-full border-4 border-blue-500 object-cover shadow-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
          <ImageDown
            className="cursor-pointer text-white"
            onClick={handleFileButtonClick}
          />
        </div>
      </div>

      <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
        <h2 className="text-4xl font-semibold text-gray-800 tracking-wide">
          {user.name || "User Name"}
        </h2>
        <p className="text-gray-500 mt-2 text-lg">
          Member Since:{" "}
          {user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A"}
        </p>
      </div>
    </div>

    <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        Contact Information
      </h3>
      <p className="text-gray-600 mb-2">
        <strong>Email:</strong> {user.email || "N/A"}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Phone:</strong> {user.phone || "N/A"}
      </p>
      <p className="text-gray-600">
        <strong>Address:</strong> {user.address || "N/A"}
      </p>
    </div>

    {/* Form to update the profile image */}
    <form onSubmit={onSubmit} className="flex flex-col items-center md:items-start">
      <label className="block mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <button
        type="submit"
        className="px-5 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 transition-transform transform hover:scale-105 duration-300"
      >
        Update Image
      </button>
    </form>
  </div>

  <style jsx>{`
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .animate-spin {
      animation: spin 1s linear infinite;
    }
  `}</style>
</div>

  );
};

export default UserProfile;
