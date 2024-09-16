import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { driverCreate } from '../../services/driverApi';
import { toast } from 'react-toastify';

export default function BillingSection() {
  const [isRadioChecked, setIsRadioChecked] = useState(false);
 
  const { register, handleSubmit, formState: { errors, isValid }, trigger, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("data======>", data);
      // API call
      const response = await driverCreate(data);
      console.log("response======>", response);
      // Redirect to login page
      if (response) {
        toast.success(response.message); // Correctly access the message
    
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.data.error || "An error occurred");
toast.error(error.response?.data?.data.error)
      console.error(error);
    }
  };

  const handleRadioChange = async () => {
    // Trigger validation and check if form is valid
    const isFormValid = await trigger(); // Trigger validation
    if (isFormValid) {
      document.getElementById('billingForm').requestSubmit(); // Manually submit the form
      setIsRadioChecked(true); // Reset the radio button
      
    } else {
      toast.error("Please fill in all required fields correctly."); // Display error message
    }
  };

  const handleFormReset = () => {
    reset(); // Reset form fields
    setIsRadioChecked(false); // Reset radio button
  };



  

  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-md">
     

        <h2 className="text-xl font-semibold mb-6">Driver Info <span className="text-gray-500">Step 1 of 3</span></h2>
        
        <div className="form-group mb-6">
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        id="submitRadio"
        name="submitRadio"
        className="toggle toggle-success"
        checked={isRadioChecked}
        onChange={handleRadioChange}
      />
      <span className="ml-3 text-gray-900 ">Submit Form</span>
    </label>
  </div>
        <form id="billingForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-group">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-950">First Name</label>
            <input
              type="text"
              id="firstName"
              {...register('firstName', { required: 'First name is required' })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Enter your first name"
              style={{ width: '100%', height: '40px' }} 
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-950">Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register('lastName', { required: 'Last name is required' })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Enter your last name"
              style={{ width: '100%', height: '40px' }} 
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="driverAge" className="block text-sm font-medium text-gray-950">Driver Age (age should be 18-70)</label>
            <input
              type="number"
              id="driverAge"
              {...register('driverAge', { 
                required: 'Driver age is required',
                min: { value: 18, message: 'Age must be at least 18' },
                max: { value: 70, message: 'Age must be 70 or below' }
              })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Enter your age"
              style={{ width: '100%', height: '40px' }} 
            />
            {errors.driverAge && <p className="text-red-500 text-sm">{errors.driverAge.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-950">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              {...register('mobileNumber', { required: 'Mobile number is required' })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Enter your mobile number"
              style={{ width: '100%', height: '40px' }} 
            />
            {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="licenceNumber" className="block text-sm font-medium text-gray-950">Licence Number
              (Licence number must be alphanumeric and between 6 to 15 character)
            </label>
            <input
              type="text"
              id="licenceNumber"
              {...register('licenceNumber', { required: 'Licence number is required' })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Enter your licence number"
              style={{ width: '100%', height: '40px' }} 
            />
            {errors.licenceNumber && <p className="text-red-500 text-sm">{errors.licenceNumber.message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
