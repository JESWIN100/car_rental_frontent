import React, { useState, useEffect } from "react";
import { fetchCars } from "../../services/carsApi";
import CarItem from "../../components/ui/CarItem";
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from "react-toastify";

const RentCar = () => {
  const [cars, setCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({})

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



  const userId = user._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('user/profile', {
          withCredentials: true,
        });
        setUser(response?.data?.data || {});
        console.log("fetchUser", response.data.data);
      } catch (error) {
        setError("Error fetching user profile.");
        console.log("Error fetching user profile:", error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);








const toggleWishlist = async (carId) => {
  try {
    // const userId = "66dbcfa103249ff63d3054a0"; 
    let response;
    if (isInWishlist(carId)) {
      response = await axiosInstance.post('/Whishlist/remove', { userId, carId }, { withCredentials: true });
      setWishlist((prevWishlist) => prevWishlist.filter(id => id !== carId));
      toast.info("Removed from wishlist");
    } else {
      response = await axiosInstance.post('/Whishlist/addWhis', { userId, carId }, { withCredentials: true });
      setWishlist((prevWishlist) => [...prevWishlist, carId]);
      toast.success("Added to wishlist");
    }
    console.log('Server response:', response.data); // Debugging line
  } catch (error) {
    console.error("Error updating wishlist:", error);
  }
};

  const isInWishlist = (carId) => wishlist.includes(carId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Recommendation Cars Section */}
      <section className="cars mt-16">
        <div className="section-title mb-8">
          <h2 className="text-2xl font-bold">Recommended Cars</h2>
        </div>
        <div className="cars-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <div key={car._id} className="relative">
              <CarItem 
                car={car}
                toggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
  
};

export default RentCar;
