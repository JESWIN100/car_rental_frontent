import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AllCars from '../../components/ui/adminUi/AllCars';
import { axiosInstance } from '../../config/axiosInstance';


const AdminCars = () => {
  const [carId, setCarId] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEditCarClick = () => {
    try {
      const id = prompt('Please enter the Car ID:', '');
      if (id) {
        navigate(`/admin/updatecar/${id}`);
      }
    } catch (error) {
      console.error('Error navigating to update car page:', error);
    }
  };

  const handleDeleteCarClick = async () => {
    try {
      const id = prompt('Please enter the Car ID to delete:', '');
      if (id) {
        // Set the carId state to trigger useEffect
        setCarId(id);
      }
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  useEffect(() => {
    const deleteCarData = async () => {
      try {
        if (carId) {
          const response = await axiosInstance.delete(`/admin/carDelete/${carId}`);
          const carData = response.data.data;
          setMessage('Car deleted successfully!');
          window.location.reload(); 
        }
      } catch (error) {
        console.error('Error deleting car data:', error);
        setMessage('Car not found or an error occurred.');
      }
    };

    deleteCarData();
  }, [carId]);

  return (
    <div className='flex flex-col gap-5 p-5'>
    <div className="flex flex-col md:flex-row gap-5 mb-5">
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Add Cars</h2>
          <p>Start adding new cars to our rental service now!</p>
          <div className="card-actions justify-end">
            <Link to="/admin/addcars">
              <button className="btn btn-primary">Add Now</button>
            </Link>
          </div>
        </div>
      </div>
  
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Edit Cars</h2>
          <p>Start editing existing cars in our rental service!</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleEditCarClick}>
              Edit Now
            </button>
          </div>
        </div>
      </div>
  
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Delete Cars</h2>
          <p>Start deleting existing cars from our rental service!</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleDeleteCarClick}>
              Delete Now
            </button>
          </div>
        </div>
      </div>
    </div>
  
    <div>
      {message && <p>{message}</p>}
      <AllCars />
    </div>
  </div>
  
  );
};

export default AdminCars;
