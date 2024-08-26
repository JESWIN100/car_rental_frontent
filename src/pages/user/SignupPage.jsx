import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { userSignup } from '../../services/userApi';
import { toast } from 'react-toastify';

export default function SignupPage() {
  const navigate =useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =async (data) =>{
    try {
      console.log("data======>",data);
      // api call
      const response=await userSignup(data);
      console.log("response======>",response);
      // redirect to login page
      if (response) {
        toast.success(response.message); // Correctly access the message
        navigate('/login');
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    console.error(error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-5">
      <div className="rounded-2xl overflow-hidden shadow-lg max-w-4xl w-full flex flex-col md:flex-row">
        <div className="p-10 flex-1">
          <h1 className="text-3xl font-bold mb-2">Welcome 🙏</h1>
          <p className="text-gray-600 text-base mb-5">
            Today is a new day. It’s your day. You shape it.
            <br />
            Sign in to start managing your projects.
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
                className="w-full p-3 border rounded-lg"
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
                className="w-full p-3 border rounded-lg"
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
                className="w-full p-3 border rounded-lg"
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
              <input
                type="password"
                id="password"
                placeholder="At least 8 characters"
                className="w-full p-3 border rounded-lg"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <Link to="/forgot-password" className="text-blue-500 text-sm text-right block mb-5">
              Forgot Password?
            </Link>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white p-3 rounded-lg"
            >
              Sign up
            </button>
          </form>
          <div className="text-center my-6">
            <span className="text-gray-500 text-sm block mb-3">Or</span>
            <button className="w-full p-3 border border-gray-300 rounded-lg mb-3 text-gray-700">
              Sign up with Google
            </button>
            <button className="w-full p-3 border border-gray-300 rounded-lg text-gray-700">
              Sign up with Facebook
            </button>
          </div>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500">
              Sign in
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
