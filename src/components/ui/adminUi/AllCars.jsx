import React, { useEffect, useState } from 'react';
import { fetchAdminCarsList } from '../../../services/adminCarsApi';

export default function AllCars() {
  const [cars, setCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAdminCarsList();
        setCars(response); // Assuming the response is an array of cars
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <section className="cars">
        <div className="section-title flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">All Cars</h2>
        </div>
        <div className="cars-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <div key={car.id} className="card card-compact bg-base-100 w-96 shadow-xl">
              <figure>
                <img
                  src={car.image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                  alt={car.id || "Car image"}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{car.brand} {car.model}</h2>
                <p>Id: {car._id || "No description available"}</p>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
