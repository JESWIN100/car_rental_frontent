import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { adminLogin } from '../../services/adminApi';

export default function AdminLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  // Watch the password field to compare it with confirm password
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...loginData } = data;
      const response = await adminLogin(loginData);

      if (response) {
        toast.success(response.message);
        navigate('/admin/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gray-900">
  <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-md bg-gray-800 text-white">
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Hey Admin 👋</h1>
      <p className="text-gray-400 text-base text-center mb-8">
        Today is a new day. It’s your day. You shape it.
        <br />
        Sign in to start managing your projects.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="email" className="font-medium mb-1 block text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Example@email.com"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="font-medium mb-1 block text-gray-300">Password</label>
          <input
            type="password"
            id="password"
            placeholder="At least 6 characters"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="font-medium mb-1 block text-gray-300">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white p-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
        >
          Log in
        </button>
      </form>
    </div>
  </div>
</div>

  );
}
