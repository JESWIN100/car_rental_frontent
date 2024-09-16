import React, { useState, useEffect } from "react";
import { fetchCars } from "../../services/carsApi";
import CarItem from "../../components/ui/CarItem";
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// Helper function to fetch data
const fetchData = async (url, setState, setError, setLoading) => {
  try {
    const response = await axiosInstance.get(url, { withCredentials: true });
    setState(response.data.data || {});
  } catch (error) {
    setError(`Error fetching data from ${url}`);
    console.error(`Error fetching data from ${url}:`, error.message);
  } finally {
    setLoading(false);
  }
};

const RentCar = () => {
  // State management
  const [cars, setCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCapacity, setSelectedCapacity] = useState('All');

  // Fetch cars data
  useEffect(() => {
    const loadCars = async () => {
      try {
        const response = await fetchCars();
        setCars(response);
        console.log("cars==========>",response);
        
      } catch (error) {
        setError("Error fetching cars");
        console.error("Error fetching cars:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  // Fetch user profile
  useEffect(() => {
    fetchData('user/profile', setUser, setError, setLoading);
  }, []);

  // Toggle wishlist
  const toggleWishlist = async (carId) => {
    const isWishlisted = isInWishlist(carId);
    const endpoint = isWishlisted ? '/Whishlist/remove' : '/Whishlist/addWhis';
  
    try {
      const response = await axiosInstance.post(endpoint, { userId: user._id, carId }, { withCredentials: true });
  
      // Update wishlist state
      setWishlist(prevWishlist => 
        isWishlisted ? prevWishlist.filter(id => id !== carId) : [...prevWishlist, carId]
      );
  
      // Show toast message
      toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  
      console.log('Server response:', response.data);
    } catch (error) {
      console.error("Error updating wishlist:", error.message);
    }
  };
  

  const isInWishlist = (carId) => wishlist.includes(carId);

  // Filter cars based on selected category and capacity
  const filteredCars = cars.filter(car => {
    const categoryMatch = selectedCategory === 'All' || car.Category === selectedCategory;
    const capacityMatch = selectedCapacity === 'All' || car.capacity === parseInt(selectedCapacity);

    return categoryMatch && capacityMatch;
  });

  // Debug logs
  console.log('Selected Category:', selectedCategory);
  console.log('Selected Capacity:', selectedCapacity);
  console.log('Filtered Cars:', filteredCars);

  // Conditional rendering based on loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      {/* Sidebar for filters */}
      <aside className="relative w-full md:w-1/4 lg:w-1/5 xl:w-1/6 transition-transform duration-300 ease-in-out md:sticky top-0">
        <div className=" rounded-lg shadow p-4">
      
          <h3 className="text-xl font-bold mb-4" 

          onClick={() => window.location.reload()}
          style={{cursor:'pointer'}}
          >Filters</h3>
          

          {/* Category Filter */}
          <FilterSection
            title="Categories"
            options={['All Cars', 'SUV', 'Sedan', 'Luxury','Hatchback','Coupe']}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          {/* Capacity Filter */}
          <FilterSection
            title="Capacity"
            options={['All Capacities', '2 Seats', '4 Seats', '5 Seats', '6 Seats','7 Seats']}
            selected={selectedCapacity}
            onSelect={setSelectedCapacity}
          />
        </div>
      </aside>

      {/* Main content area showing filtered cars */}
      <div className="flex-1 mt-8 md:mt-0">
        <section className="cars">
          <div className="section-title mb-8">
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'All' ? 'All Cars' : selectedCategory} 
              {selectedCapacity === 'All' ? '' : ` with ${selectedCapacity} Seats`}
            </h2>
          </div>
          <div className="cars-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarItem
                key={car._id}
                car={car}
                toggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// Component for filter sections
const FilterSection = ({ title, options, selected, onSelect }) => (
  <div className="mb-6">
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <ul>
      {options.map(option => (
        <li
          key={option}
          className={`cursor-pointer mb-2 ${selected === option ? 'font-bold text-blue-600' : ''}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  </div>
);

export default RentCar;
