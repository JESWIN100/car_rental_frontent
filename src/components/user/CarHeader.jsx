import React from 'react';
import { Heart, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { searchCar } from '../../services/carsApi';

export default function CarHeader() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("data======>", data);
      // api call
      const response = await searchCar(data);
      console.log("response======>", response);
      // redirect to login page
      if (response) {
        toast.success(response.message); // Correctly access the message
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };

  return (
    <header className="bg-white p-5 flex justify-center items-center border-b border-gray-200">
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
          name="model" // Added name attribute
          {...register("model",{ required: true })} // Assuming 'model' is the field used for search
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
        <Link to={'/wishlist'}>
          <Heart size={24} color="#FF69B4" className="text-gray-600 cursor-pointer" />
        </Link>
        <Bell className="text-gray-600 cursor-pointer" aria-label="Notifications" />
        
        {/* Avatar Group */}
        <div className="avatar-group flex items-center space-x-2">
          <div className="avatar w-11">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User Avatar"
              className="w-6 h-6 rounded-full border border-gray-300"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
