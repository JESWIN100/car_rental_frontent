import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import { useNavigate } from 'react-router-dom';
import { createCar } from '../../../services/adminCarsApi';

export default function CarAdding() {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
  
    const onSubmit = async (data) => {
      try {
        const formData = new FormData();
  
        // Append all form data including image
        for (const key in data) {
          if (key === 'image') {
            formData.append(key, data[key][0]); // Handle file differently
          } else {
            formData.append(key, data[key]);
          }
        }
  
        // API call
        const response = await createCar(formData);
        console.log('response======>', response);
  
        if (response) {
          toast.success(response.message); // Correct success message
          navigate('/admin/addcars'); 
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'An error occurred');
        console.error(error);
      }
    };





  return (
    <div className="container mx-auto p-4">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg">
        <div className="bg-gray-800 text-white text-center py-3 rounded-t-lg">
          <h4 className="text-xl font-bold">Add New Car</h4>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block text-gray-700">Brand</label>
              <input
                type="text"
                placeholder="Enter car brand"
                className={`form-input mt-1 block w-full border rounded-md ${errors.brand ? 'border-red-500' : ''}`}
                {...register('brand', { required: 'Brand is required' })}
                style={{ width: '100%', height: '40px' }} 
              />
              {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Model</label>
              <input
                type="text"
                placeholder="Enter car model"
                className={`form-input mt-1 block w-full border rounded-md ${errors.model ? 'border-red-500' : ''}`}
                {...register('model', { required: 'Model is required' })}
                style={{ width: '100%', height: '40px' }} 
              />
              {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Year</label>
              <input
                type="number"
                placeholder="Enter car year"
                className={`form-input mt-1 block w-full border rounded-md ${errors.year ? 'border-red-500' : ''}`}
                {...register('year', { required: 'Year is required' })}
                style={{ width: '100%', height: '40px' }}
              />
              {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Price Per Day</label>
              <input
                type="number"
                placeholder="Enter price per day"
                className={`form-input mt-1 block w-full border rounded-md ${errors.pricePerDay ? 'border-red-500' : ''}`}
                {...register('pricePerDay', { required: 'Price per day is required' })}
                style={{ width: '100%', height: '40px' }}
              />
              {errors.pricePerDay && <p className="text-red-500 text-sm mt-1">{errors.pricePerDay.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Capacity</label>
              <input
                type="number"
                placeholder="Enter car capacity"
                className={`form-input mt-1 block w-full border rounded-md ${errors.capacity ? 'border-red-500' : ''}`}
                {...register('capacity', { required: 'Capacity is required' })}
                style={{ width: '100%', height: '40px' }}
              />
              {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Transmission</label>
              <select
                className={`form-select mt-1 block w-full border rounded-md ${errors.transmission ? 'border-red-500' : ''}`}
                {...register('transmission', { required: 'Transmission is required' })}
                style={{ width: '100%', height: '40px' }}
              >
                <option value="">Select Transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
              {errors.transmission && <p className="text-red-500 text-sm mt-1">{errors.transmission.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Fuel Type</label>
              <select
                className={`form-select mt-1 block w-full border rounded-md ${errors.fuelType ? 'border-red-500' : ''}`}
                {...register('fuelType', { required: 'Fuel type is required' })}
                style={{ width: '100%', height: '40px' }}
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors.fuelType && <p className="text-red-500 text-sm mt-1">{errors.fuelType.message}</p>}
            </div>


            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <select
                className={`form-select mt-1 block w-full border rounded-md ${errors.fuelType ? 'border-red-500' : ''}`}
                {...register('Category', { required: 'Category is required' })}
                style={{ width: '100%', height: '40px' }}
              >
                <option value="">Select a category</option>
          <option value="Sedan">Sedan</option>
          <option value="Luxury">Luxury</option>
          <option value="SUV">SUV</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Coupe">Coupe</option>
          <option value="Convertible">Convertible</option>
          <option value="Wagon">Wagon</option>
          <option value="Pickup Truck">Pickup Truck</option>
          <option value="Minivan">Minivan</option>
          <option value="Sports Car">Sports Car</option>
          <option value="Electric">Electric</option>
          <option value="Luxury SUV">Luxury SUV</option>
          <option value="Hybrid SUV">Hybrid SUV</option>
          <option value="Hybrid SUV">Hatchback</option>
          
              </select>
              {errors.fuelType && <p className="text-red-500 text-sm mt-1">{errors.fuelType.message}</p>}
            </div>



            <div className="mb-4">
              <label className="block text-gray-700">Mileage</label>
              <input
                type="number"
                placeholder="Enter mileage"
                className={`form-input mt-1 block w-full border rounded-md ${errors.mileage ? 'border-red-500' : ''}`}
                {...register('mileage', { required: 'Mileage is required' })}
                style={{ width: '100%', height: '40px' }}
              />
              {errors.mileage && <p className="text-red-500 text-sm mt-1">{errors.mileage.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Color</label>
              <input
                type="text"
                placeholder="Enter color"
                className={`form-input mt-1 block w-full border rounded-md ${errors.color ? 'border-red-500' : ''}`}
                {...register('color', { required: 'Color is required' })}
                style={{ width: '100%', height: '40px' }}
              />
              {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>}
            </div>


<div className="mb-4">
              <label className="block text-gray-700">Engine CC</label>
              <input
                type="text"
                placeholder="Enter Engine CC"
                className={`form-input mt-1 block w-full border rounded-md ${errors.color ? 'border-red-500' : ''}`}
                {...register('EngineCC', { required: 'Engine CC is required' })}
                style={{ width: '100%', height: '40px' }}
              />
              {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>}
            </div>



<div className="mb-4">
              <label className="block text-gray-700">BootStrap</label>
              <input
                type="text"
                placeholder="Enter BootStrap"
                className={`form-input mt-1 block w-full border rounded-md ${errors.color ? 'border-red-500' : ''}`}
                {...register('BootSpace', { required: 'BootSpace is required' })}
                style={{ width: '100%', height: '40px' }}
              />
              {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>}
            </div>


<div className="mb-4">
              <label className="block text-gray-700">Torque</label>
              <input
                type="text"
                placeholder="Enter BootSpace"
                className={`form-input mt-1 block w-full border rounded-md ${errors.color ? 'border-red-500' : ''}`}
                {...register('Torque', { required: 'Torque is required' })}
                style={{ width: '100%', height: '40px' }}
              />
              {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>}
            </div>




<div className="mb-4">
              <label className="block text-gray-700">FuelCapacity</label>
              <input
                type="text"
                placeholder="Enter FuelCapacity"
                className={`form-input mt-1 block w-full border rounded-md ${errors.color ? 'border-red-500' : ''}`}
                {...register('FuelCapacity', { required: 'FuelCapacity is required' })}
                style={{ width: '100%', height: '40px' }}
              />
              {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>}
            </div>



            <div className="mb-4">
              <label className="block text-gray-700">Registration Number</label>
              <input
                type="text"
                placeholder="Enter registration number"
                className={`form-input mt-1 block w-full border rounded-md ${errors.registrationNumber ? 'border-red-500' : ''}`}
                {...register('registrationNumber', { required: 'Registration number is required' })}
                style={{ width: '100%', height: '40px' }}
              />
              {errors.registrationNumber && <p className="text-red-500 text-sm mt-1">{errors.registrationNumber.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                className={`form-input mt-1 block w-full border rounded-md ${errors.image ? 'border-red-500' : ''}`}
                {...register('image', { required: 'Image is required' })}
                
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  {...register('availability')}
          
                />
                <span className="ml-2 text-gray-700">Available</span>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                rows="3"
                placeholder="Enter car description"
                className={`form-textarea mt-1 block w-full border rounded-md ${errors.description ? 'border-red-500' : ''}`}
                {...register('description', { required: 'Description is required' })}
                style={{ width: '100%', height: '100px' }}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Add Car
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
