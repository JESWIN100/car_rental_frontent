import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CarRentalForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setTimeout(() => {
      navigate('/car/carslist');
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 rounded-lg shadow-lg max-w-screen-xl mx-auto">
      {/* Pick-Up Section */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-2 text-base mb-4 md:mb-0">
          <input type="radio" id="pickup" name="service" defaultChecked />
          <label htmlFor="pickup">Pick-Up</label>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="flex flex-col bg-gray-100 w-full md:w-48">
            <label htmlFor="pickup-location" className="text-gray-600 text-sm mb-1">Location</label>
            <input
              id="pickup-location"
              type="text"
              placeholder="Enter your city"
              {...register('location', { required: 'Location is required' })}
              className={`p-2 rounded border border-gray-300 text-sm bg-gray-100 ${errors.location ? 'border-red-500' : ''}`}
            />
            {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
          </div>
          <div className="flex flex-col bg-gray-100 w-full md:w-32">
            <label htmlFor="pickup-date" className="text-gray-600 text-sm mb-1">Date</label>
            <input
              id="pickup-date"
              type="date"
              {...register('date', { required: 'Date is required' })}
              className={`p-2 rounded border border-gray-300 text-sm bg-gray-100 ${errors.date ? 'border-red-500' : ''}`}
            />
            {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
          </div>
          <div className="flex flex-col bg-gray-100 w-full md:w-32">
            <label htmlFor="pickup-time" className="text-gray-600 text-sm mb-1">Time</label>
            <input
              id="pickup-time"
              type="time"
              {...register('time', { required: 'Time is required' })}
              className={`p-2 rounded border border-gray-300 text-sm bg-gray-100 ${errors.time ? 'border-red-500' : ''}`}
            />
            {errors.time && <p className="text-red-500 text-xs">{errors.time.message}</p>}
          </div>
          <button
          type='submit'
           className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300">
              Search
            </button>
        </form>
      </div>
    </div>
  );
};

export default CarRentalForm;
