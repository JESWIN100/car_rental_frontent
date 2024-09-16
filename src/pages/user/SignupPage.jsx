import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { userSignup } from '../../services/userApi';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function SignupPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log("data======>", data);
      const response = await userSignup(data);
      console.log("response======>", response);
      if (response) {
        toast.success(response.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className=" bg-gray-900 flex justify-center items-center min-h-screen p-5 ">
      <div className=" bg-gray-800 rounded-2xl overflow-hidden shadow-lg max-w-4xl w-full flex flex-col md:flex-row ">
        <div className="p-10 flex-1 relative text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome 🙏</h1>
          <p className="text-gray-400 text-base mb-5">
            Today is a new day. It’s your day. You shape it.
            <br />
            Sign up to start managing your projects.
          </p>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="font-medium mb-1 block">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="w-full p-3 border  border-gray-600 bg-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="font-medium mb-1 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Example@email.com"
                className="w-full p-3 border  border-gray-600 bg-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 "
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="font-medium mb-1 block">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="At least 10 numbers"
                className="w-full p-3 border  border-gray-600 bg-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                {...register('phone', {
                  required: 'Phone number is required',
                  minLength: {
                    value: 10,
                    message: 'Phone number must be at least 10 digits',
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="font-medium mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="At least 8 characters"
                  className="w-full p-3 border g pr-10  border-gray-600 bg-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size="lg" />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            {/* <Link to="/forgot-password" className="text-blue-500 text-sm text-right block mb-5">
              Forgot Password?
            </Link> */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all"
            >
              Sign up
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500">
              Log in
            </Link>
          </p>
        </div>
        <div className="hidden md:block flex-1 overflow-hidden">
          <img
            src="https://www.journalduluxe.fr/files/resize/outside/875-875-rolls-royce-chiffres-records-2023_b4214c30729c6b25677bef69f8c97ce6.jpeg"
            alt="Car Image"
            className="w-full h-full object-cover"
            style={{ borderRadius: '2px 16px' }}
          />
        </div>
      </div>
    </div>
  );
}
