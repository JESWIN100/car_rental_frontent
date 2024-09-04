import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { bookingCreate } from '../../services/bookingApi';
import { toast } from 'react-toastify';
import { fetchCarsDetails } from '../../services/carsApi';
import { useParams } from 'react-router-dom';
import TotalAmountDisplay from './TotalAmountDisplay';

export default function CarRentalInfo({ setTotalAmount }) { // Accept setTotalAmount as a prop
  const [carDetails, setCarDetails] = useState(null);
  const [isRadioChecked, setIsRadioChecked] = useState(false);
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors, isValid }, trigger, reset } = useForm();
  
  // Calculate the rental amount
  const calculateAmount = (startDate, startTime, endDate, endTime) => {
    const pickupDateTime = new Date(`${startDate}T${startTime}`);
    const dropoffDateTime = new Date(`${endDate}T${endTime}`);
    const diffInMilliseconds = dropoffDateTime - pickupDateTime;
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)); // Round up to the nearest day
    const ratePerDay = parseFloat(carDetails.pricePerDay); // Convert to number
    const total = diffInDays * ratePerDay;
    setTotalAmount(total); // Use setTotalAmount to update the state in BookingPage
  };

  // Handle form submission
const onSubmit = async (data) => {
  try {
    calculateAmount(data.startDate, data.startTime, data.endDate, data.endTime);

    const bookingData = {
      ...data,
      carId: id, // Add carId to the booking data
    };

    const response = await bookingCreate(bookingData);
    if (response) {
      toast.success(response.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
    console.error(error);
  }
};


  // Handle radio button change
  const handleRadioChange = async () => {
    const isFormValid = await trigger();
    if (isFormValid) {
      handleSubmit(onSubmit)();
      setIsRadioChecked(false);
    } else {
      toast.error("Please fill in all required fields correctly.");
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchCarsDetails(id);
        setCarDetails(response);
      } catch (error) {
        toast.error("Error fetching car details");
        console.error("Error fetching car details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  // Reset form fields
  const handleFormReset = () => {
    reset();
    setIsRadioChecked(false);
  };

  const citiesInKerala = [
    'Thiruvananthapuram', 'Kochi', 'Kollam', 'Alappuzha', 'Palakkad',
    'Kannur', 'Thrissur', 'Varkala', 'Wayanad', 'Idukki',
    'Malappuram', 'Kasargod', 'Ernakulam', 'Kottayam'
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md pt-10">
      
      <h2 className="text-xl font-semibold">
      <input
            type="radio"
            id="radio-button"
            className="form-control"
            checked={isRadioChecked}
            onChange={() => setIsRadioChecked(!isRadioChecked)}
            onClick={handleRadioChange}
          />
        Car Rental Information <span className="text-gray-500">Step 2 of 3</span>
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form Fields */}
          {/* Add other form fields for pickup and dropoff locations, driver age, etc. */}
          <div className="form-group">
            <label htmlFor="startDate" className="block font-medium">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              {...register('startDate', { required: true })}
              className={`form-control ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.startDate && <span className="text-red-500">Start date is required.</span>}
          </div>
          <div className="form-group">
            <label htmlFor="startTime" className="block font-medium">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              {...register('startTime', { required: true })}
              className={`form-control ${errors.startTime ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.startTime && <span className="text-red-500">Start time is required.</span>}
          </div>
          <div className="form-group">
            <label htmlFor="endDate" className="block font-medium">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              {...register('endDate', { required: true })}
              className={`form-control ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.endDate && <span className="text-red-500">End date is required.</span>}
          </div>
          <div className="form-group">
            <label htmlFor="endTime" className="block font-medium">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              {...register('endTime', { required: true })}
              className={`form-control ${errors.endTime ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.endTime && <span className="text-red-500">End time is required.</span>}
          </div>
        </div>
       
        <div className="form-group">
          <label htmlFor="pickup-location" className="block font-medium">
            Pickup Location
          </label>
          <select
            id="pickup-location"
            {...register('pickupLocation', { required: true })}
            className={`form-control ${errors.pickupLocation ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select Pickup Location</option>
            {citiesInKerala.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.pickupLocation && <span className="text-red-500">Pickup location is required.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="dropoff-location" className="block font-medium">
            Dropoff Location
          </label>
          <select
            id="dropoff-location"
            {...register('dropoffLocation', { required: true })}
            className={`form-control ${errors.dropoffLocation ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select Dropoff Location</option>
            {citiesInKerala.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.dropoffLocation && <span className="text-red-500">Dropoff location is required.</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="radio-button" className="block font-medium">
            Confirm Rental Information
          </label>
          {/* <input
            type="radio"
            id="radio-button"
            className="form-control"
            checked={isRadioChecked}
            onChange={() => setIsRadioChecked(!isRadioChecked)}
          /> */}
          {/* <button
            type="button"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 mt-2"
            onClick={handleRadioChange}
          >
            Calculate Total Amount
          </button> */}
        </div>
      </form>
    </div>
  );
}
