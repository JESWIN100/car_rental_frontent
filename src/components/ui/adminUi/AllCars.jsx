import React, { useEffect, useState } from 'react';
import { fetchAdminCarsList } from '../../../services/adminCarsApi';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosInstance';
import { toast } from 'react-toastify';
import { FilePenLine, Trash2 } from 'lucide-react';

export default function AllCars() {
  const [cars, setCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAdminCarsList();
        setCars(response); 
      } catch (error) {
        setError("Error fetching cars");
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleWishlist = (car) => {
    if (wishlist.includes(car.id)) {
      setWishlist(wishlist.filter((id) => id !== car.id));
    } else {
      setWishlist([...wishlist, car.id]);
    }
  };

  const isInWishlist = (car) => wishlist.includes(car.id);

  const handleEdit = (carId) => {
   try {
    console.log(`Edit car with ID: ${carId}`);
    navigate(`/admin/updatecar/${carId}`);
   } catch (error) {
    console.log(error);
    
   }
  };

  const handleDelete = async (carId) => {
    try {
      // Prompt for confirmation before deletion
      const confirmDelete = window.confirm(`Are you sure you want to delete the car with ID: ${carId}?`);
  
      if (confirmDelete) {
        const response = await axiosInstance.delete(`/admin/carDelete/${carId}`, {
          withCredentials: true,
        });
        const carData = response.data.data;
        toast.success('Car deleted successfully!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      // setMessage('Error deleting car. Please try again.');
    }
  };
  



  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <section className="cars">
        <div className="section-title flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">All Cars</h2>
        </div>
        <div className="cars-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car._id} className="card card-compact bg-base-100 w-96 shadow-xl">
              <figure>
                <img
                  src={car.image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                  alt={car.model || "Car image"}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{car.brand} {car.model}</h2>
                <p>Id: {car._id || "No ID available"}</p>
                <div className="card-actions flex justify-end gap-4 mt-4">
            <div className="relative group">
              <FilePenLine className="  rounded-full cursor-pointer transition-colors duration-200 text-8xl" onClick={() => handleEdit(car._id)} />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-max text-black   text-sm rounded  opacity-0 group-hover:opacity-100 transition-opacity duration-200">Edit</span>
            </div>
            <div className="relative group">
              <Trash2 className="  rounded-full cursor-pointer transition-colors duration-200" onClick={() => handleDelete(car._id)} />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-max  text-black text-xs rounded  opacity-0 group-hover:opacity-100 transition-opacity duration-200">Delete</span>
            </div>
          </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
