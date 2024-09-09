import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { bookingCreate, confirmBooking } from '../../services/bookingApi';
import { toast } from 'react-toastify';
import { fetchCarsDetails } from '../../services/carsApi';
import { useParams } from 'react-router-dom';
import TotalAmountDisplay from './TotalAmountDisplay';
import { axiosInstance } from '../../config/axiosInstance';

export default function CarRentalInfo({ setTotalAmount}) { // Accept setTotalAmount as a prop
  const [carDetails, setCarDetails] = useState(null);
  const [isRadioChecked, setIsRadioChecked] = useState(false);
  const [bookingId, setBookingId] = useState(null); // Add state for bookingId
  const [user,setUser]=useState({})
  const { id} = useParams();
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
        carId: id,
        userId: user._id,
      };

      const response = await bookingCreate(bookingData);
      console.log("bookingCreate", response);
      
      if (response) {
        toast.success(response.message);
        setBookingId(response.data._id); // Save the bookingId to state
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
        console.log("fetchCarsDetails", response);
        
      } catch (error) {
        toast.error("Error fetching car details");
        console.error("Error fetching car details:", error);
      }
    };

    fetchDetails();
  }, [id]);


  useEffect(() => {
  const fetchUser = async () => {
    try {
        const response = await axiosInstance.get('user/profile', {
            withCredentials: true, // Include cookies with the request
        });
        setUser(response?.data?.data);
        console.log("fetchUser", response.data.data);
    } catch (error) {
        console.log("Error fetching user profile:", error.response?.data?.message || error.message);
    }
};

fetchUser()
}, [id]);

 
  // Handle confirm booking
  const handleConfirm = async () => {
    if (!bookingId) {
      toast.error("No booking found. Please complete the booking process first.");
      return;
    }

    try {
      const response = await confirmBooking(bookingId);
      console.log("confirmed=====>", response);
      
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  // Reset form fields
  function handleFormReset() {
    reset();
    setIsRadioChecked(false);
  }

  const citiesInKerala = [
    'Thiruvananthapuram', 'Kochi', 'Kollam', 'Alappuzha', 'Palakkad',
    'Kannur', 'Thrissur', 'Varkala', 'Wayanad', 'Idukki',
    'Malappuram', 'Kasargod', 'Ernakulam', 'Kottayam'
  ];


  return (
    <div className="bg-white p-4 rounded-lg shadow-md pt-10">
  <h2 className="text-xl font-semibold mb-4 text-gray-700">
    <input
      type="radio"
      id="radio-button"
      className="form-control mr-2"
      checked={isRadioChecked}
      onChange={() => setIsRadioChecked(!isRadioChecked)}
      onClick={handleRadioChange}
      
    />
    Car Rental Information <span className="text-gray-500">Step 2 of 3</span>
  </h2>
  
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Date and Time Fields */}
      <div className="form-group">
        <label htmlFor="startDate" className="block font-medium mb-1 text-gray-950">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          {...register('startDate', { required: true })}
          className={`form-control bg-white text-gray-950 ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.startDate && <span className="text-red-500 text-sm">Start date is required.</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="startTime" className="block font-medium mb-1 text-gray-950">
          Start Time
        </label>
        <input
          type="time"
          id="startTime"
          {...register('startTime', { required: true })}
          className={`form-control bg-white text-gray-950 ${errors.startTime ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.startTime && <span className="text-red-500 text-sm">Start time is required.</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="endDate" className="block font-medium mb-1 text-gray-950">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          {...register('endDate', { required: true })}
          className={`form-control bg-white text-gray-950 ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.endDate && <span className="text-red-500 text-sm">End date is required.</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="endTime" className="block font-medium mb-1 text-gray-950">
          End Time
        </label>
        <input
          type="time"
          id="endTime"
          {...register('endTime', { required: true })}
          className={`form-control bg-white text-gray-950 ${errors.endTime ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.endTime && <span className="text-red-500 text-sm">End time is required.</span>}
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Pickup and Dropoff Locations */}
      <div className="form-group">
        <label htmlFor="pickup-location" className="block font-medium mb-1 text-gray-950">
          Pickup Location
        </label>
        <select
          id="pickup-location"
          {...register('pickupLocation', { required: true })}
          className={`form-control bg-white text-gray-950 ${errors.pickupLocation ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="" className='text-gray-950'>Select Pickup Location</option>
          {citiesInKerala.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.pickupLocation && <span className="text-red-500 text-sm">Pickup location is required.</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="dropoff-location" className="block font-medium mb-1 text-gray-950">
          Dropoff Location
        </label>
        <select
          id="dropoff-location"
          {...register('dropoffLocation', { required: true })}
          className={`form-control bg-white text-gray-950 ${errors.dropoffLocation ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="" className='text-gray-950'>Select Dropoff Location</option>
          {citiesInKerala.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.dropoffLocation && <span className="text-red-500 text-sm">Dropoff location is required.</span>}
      </div>
    </div>
    
   { /* Confirm Booking Checkbox */}
     {/* <div className="form-group mt-4">
          <div className="form-control flex flex-row items-center">
            <span className="label-text p-2">Confirm Booking:</span>
            <input type="checkbox" 
              onClick={handleConfirm}
              className="checkbox checkbox-primary mr-2" />
          </div>
        </div>  */}

  </form>
</div>

  );
}
