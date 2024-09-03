import React, { useState, useEffect } from "react";
import { fetchCars } from "../../services/carsApi";
import CarItem from "../../components/ui/CarItem";

const RentCar = () => {
  const [cars, setCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCars();
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
    <div className="container mx-auto p-4">
      {/* Popular Cars Section */}
      {/* <section className="cars">
        <div className="section-title flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Popular Cars</h2>
          <a href="#" className="text-blue-500 hover:underline">View All</a>
        </div>
        <div className="cars-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.map(car => (
            <CarItem 
              key={car.id} 
              car={car} 
              toggleWishlist={toggleWishlist} 
              isInWishlist={isInWishlist} 
            />
          ))}
        </div>
      </section> */}

      {/* Recommendation Cars Section */}
      <section className="cars mt-16">
        <div className="section-title mb-8">
          <h2 className="text-2xl font-bold">Recommended Cars</h2>
        </div>
        <div className="cars-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.map(car => (
            <CarItem 
              key={car.id} 
              car={car} 
              toggleWishlist={toggleWishlist} 
              isInWishlist={isInWishlist} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RentCar;
