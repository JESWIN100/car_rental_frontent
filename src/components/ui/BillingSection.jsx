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
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };

  const handleRadioChange = async () => {
    // Trigger validation and check if form is valid
    const isFormValid = await trigger(); // Trigger validation
    if (isFormValid) {
      document.getElementById('billingForm').requestSubmit(); // Manually submit the form
      setIsRadioChecked(false); // Reset the radio button
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
        <div className="form-group">
          <input
            type="radio"
            id="submitRadio"
            name="submitRadio"
            checked={isRadioChecked}
            onChange={() => setIsRadioChecked(!isRadioChecked)}
            onClick={handleRadioChange}
          />
          <label htmlFor="submitRadio">Submit Form</label>
        </div>
        <h2 className="text-xl font-semibold">Billing Info <span className="text-gray-500">Step 1 of 3</span></h2>
        <form id="billingForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-group">
            <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              id="firstName"
              {...register('firstName', { required: 'First name is required' })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Enter your first name"
              style={{ width: '100%', height: '40px' }} 
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register('lastName', { required: 'Last name is required' })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Enter your last name"
              style={{ width: '100%', height: '40px' }} 
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="driverAge" className="block text-sm font-medium">Driver Age (age should be 18-70)</label>
            <input
              type="number"
              id="driverAge"
              {...register('driverAge', { 
                required: 'Driver age is required',
                min: { value: 18, message: 'Age must be at least 18' },
                max: { value: 70, message: 'Age must be 70 or below' }
              })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Enter your age"
              style={{ width: '100%', height: '40px' }} 
            />
            {errors.driverAge && <p className="text-red-500 text-sm">{errors.driverAge.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber" className="block text-sm font-medium">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              {...register('mobileNumber', { required: 'Mobile number is required' })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Enter your mobile number"
              style={{ width: '100%', height: '40px' }} 
            />
            {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="licenceNumber" className="block text-sm font-medium">Licence Number</label>
            <input
              type="text"
              id="licenceNumber"
              {...register('licenceNumber', { required: 'Licence number is required' })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
