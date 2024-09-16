import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { userLogin } from '../../services/userApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...loginData } = data;
      const response = await userLogin(loginData);
      console.log("login data", response);

      if (response) {
        toast.success(response.message);
        navigate('/user/home');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev);
  };

  const password = watch("password");

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center p-5">
      <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg max-w-4xl w-full flex flex-col md:flex-row">
        <div className="p-10 flex-1 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
          <p className="text-gray-400 text-lg mb-6">
            Start your journey with us. Sign in to manage your projects and much more.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="font-medium mb-1 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="font-medium mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Your password"
                  className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size="lg" className="text-gray-400" />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirm-password" className="font-medium mb-1 block">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Confirm your password"
                  className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    minLength: {
                      value: 8,
                      message: "Confirm Password must be at least 8 characters long",
                    },
                    validate: value =>
                      value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={handleToggleConfirmPassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} size="lg" className="text-gray-400" />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
        <div className="hidden md:block flex-1">
          <img
            src="https://pbs.twimg.com/media/F2H0hykWMAACJ76?format=jpg&name=4096x4096"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
