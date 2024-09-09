import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../../config/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCar = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { carId } = useParams();

  useEffect(() => {
    if (carId) {
      const fetchCarData = async () => {
        try {
          const response = await axiosInstance.get(`/admin/carsById/${carId}`);
          const carData = response.data.data;

          // Set form values with fetched car data
          Object.keys(carData).forEach((key) => {
            setValue(key, carData[key]);
          });

          setMessage('Car details loaded successfully!');
        } catch (error) {
          console.error('Error fetching car data:', error);
          setMessage('Car not found or an error occurred.');
        }
      };

      fetchCarData();
    }
  }, [carId, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      
      // Append all form data including image
      for (const key in data) {
        // If the field is 'image' and it's a file, append it correctly
        if (key === 'image' && data[key][0]) {
          formData.append(key, data[key][0]); // Ensure to append only the file
        } else {
          formData.append(key, data[key]);
        }
      }
  
      const response = await axiosInstance.put(`/admin/carUpdate/${carId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  console.log(response);
  
      toast.success(response.data.message);
      navigate('/admin/cars');
      setMessage('Car details updated successfully!');
    } catch (error) {
      console.error('Error updating car details:', error);
      setMessage('Failed to update car details. Please check the data and try again.');
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Update Car Details</h1>

      <p className="mt-4 text-lg">{message}</p>

      <div className="bg-white p-6 mt-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Car Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form fields */}
          <div className="mb-4">
            <label className="block text-gray-700">Description:</label>
            <input
              {...register('description')}
              className="border p-2 w-full"
              placeholder="Description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Brand:</label>
            <input
              {...register('brand')}
              className="border p-2 w-full"
              placeholder="Brand"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Model:</label>
            <input
              {...register('model')}
              className="border p-2 w-full"
              placeholder="Model"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Year:</label>
            <input
              type="number"
              {...register('year')}
              className="border p-2 w-full"
              placeholder="Year"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price Per Day:</label>
            <input
              type="number"
              {...register('pricePerDay')}
              className="border p-2 w-full"
              placeholder="Price Per Day"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Capacity:</label>
            <input
              type="number"
              {...register('capacity')}
              className="border p-2 w-full"
              placeholder="Capacity"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Transmission:</label>
            <input
              {...register('transmission')}
              className="border p-2 w-full"
              placeholder="Transmission"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fuel Type:</label>
            <input
              {...register('fuelType')}
              className="border p-2 w-full"
              placeholder="Fuel Type"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mileage:</label>
            <input
              {...register('mileage')}
              className="border p-2 w-full"
              placeholder="Mileage"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Color:</label>
            <input
              {...register('color')}
              className="border p-2 w-full"
              placeholder="Color"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Registration Number:</label>
            <input
              {...register('registrationNumber')}
              className="border p-2 w-full"
              placeholder="Registration Number"
            />
          </div>

          <div className="mb-4">
  <label className="block text-gray-700">Image:</label>
  <input
    type="file"
    accept="image/*" // Ensure only image files can be selected
    className={`form-input mt-1 block w-full border rounded-md ${errors.image ? 'border-red-500' : ''}`}
    {...register('image')}
  />
  {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
</div>


          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Update Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;
