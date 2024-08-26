import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { userLogin } from '../../services/userApi';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Used to monitor changes in form values
  } = useForm();

const navigate =useNavigate()


const onSubmit = async (data) => {
  try {
    const { confirmPassword, ...loginData } = data;
    const response = await userLogin(loginData);

    if (response) {
      toast.success(response.message); // Correctly access the message
      navigate('/user/home');
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
    console.error(error);
  }
};
  // Watch the password field to compare it with the confirm password field
  const password = watch("password");

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen p-5">
        <div className="rounded-2xl overflow-hidden shadow-lg max-w-4xl w-full flex flex-col md:flex-row">
          <div className="p-10 flex-1">
            <h1 className="text-3xl font-bold mb-2">Welcome Back 👋</h1>
            <p className="text-gray-600 text-base mb-5">
              Today is a new day. It’s your day. You shape it.
              <br />
              Sign in to start managing your projects.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="email" className="font-medium mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Example@email.com"
                  className="w-full p-3 border rounded-lg"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="font-medium mb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="At least 8 characters"
                  className="w-full p-3 border rounded-lg"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="confirm-password" className="font-medium mb-1 block">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="At least 8 characters"
                  className="w-full p-3 border rounded-lg"
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
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <a href="#" className="text-blue-500 text-sm text-right block mb-5">
                Forgot Password?
              </a>
              <button
                type="submit"
                className="w-full bg-gray-800 text-white p-3 rounded-lg"
              >
                Log in
              </button>
            </form>
            <div className="text-center my-6">
              <span className="text-gray-500 text-sm block mb-3">Or</span>
              <button className="w-full p-3 border border-gray-300 rounded-lg mb-3 text-gray-700">
                Log in with Google
              </button>
              <button className="w-full p-3 border border-gray-300 rounded-lg text-gray-700">
                Log in with Facebook
              </button>
            </div>
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
          <div className="hidden md:block flex-1 overflow-hidden">
            <img
              src="https://pbs.twimg.com/media/F2H0hykWMAACJ76?format=jpg&name=4096x4096"
              alt="Login Illustration"
              className="w-full h-full object-cover"
              style={{ borderRadius: '2px 16px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
