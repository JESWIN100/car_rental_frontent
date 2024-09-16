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
            <select
              id="pickup-location"
              {...register('location', { required: 'Location is required' })}
              className={`p-2 rounded border border-gray-300 text-sm bg-gray-100 ${errors.location ? 'border-red-500' : ''}`}
            >
              <option value="">Select a location</option>
              <option value="Munnar">Munnar</option>
              <option value="Alleppey">Alleppey</option>
              <option value="Kochi">Kochi</option>
              <option value="Wayanad">Wayanad</option>
              <option value="Kovalam">Kovalam</option>
              <option value="Thekkady">Thekkady</option>
              <option value="Athirappilly">Athirappilly</option>
              <option value="Varkala">Varkala</option>
              <option value="Ponmudi">Ponmudi</option>
              <option value="Kumarakom">Kumarakom</option>
              <option value="Muzhappilangad">Muzhappilangad</option>
              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
              <option value="Silent Valley National Park">Silent Valley National Park</option>
              <option value="Peermedu">Peermedu</option>
              <option value="Guruvayur">Guruvayur</option>
              <option value="Munambam Beach">Munambam Beach</option>
              <option value="Thalassery">Thalassery</option>
              <option value="Pathanamthitta">Pathanamthitta</option>
              <option value="Kollam">Kollam</option>
              <option value="Palakkad">Palakkad</option>
              <option value="Malappuram">Malappuram</option>
              <option value="Nelliampathy">Nelliampathy</option>
              <option value="Bekal">Bekal</option>
              <option value="Kannur">Kannur</option>
              <option value="Thrissur">Thrissur</option>
            </select>
            {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
          </div>
          <div className="flex flex-col bg-gray-100 w-full md:w-32">
            <label htmlFor="start-date" className="text-gray-600 text-sm mb-1">Start Date</label>
            <input
              id="start-date"
              type="date"
              {...register('startDate', { required: 'Start date is required' })}
              className={`p-2 rounded border border-gray-300 text-sm bg-gray-100 ${errors.startDate ? 'border-red-500' : ''}`}
            />
            {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate.message}</p>}
          </div>
          <div className="flex flex-col bg-gray-100 w-full md:w-32">
            <label htmlFor="end-date" className="text-gray-600 text-sm mb-1">End Date</label>
            <input
              id="end-date"
              type="date"
              {...register('endDate', { required: 'End date is required' })}
              className={`p-2 rounded border border-gray-300 text-sm bg-gray-100 ${errors.endDate ? 'border-red-500' : ''}`}
            />
            {errors.endDate && <p className="text-red-500 text-xs">{errors.endDate.message}</p>}
          </div>
          <button
            type='submit'
            className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default CarRentalForm;
