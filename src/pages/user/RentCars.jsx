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




{/* Breadcrumbs */}
<div className="breadcrumbs text-sm mb-4">
      <ul>
        <li>
          <Link to="/user/home">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-4 w-4 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
            Home
          </Link>
        </li>
        <li>
        <Link to="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-4 w-4 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Car list
          </Link>
        </li>
      </ul>
    </div>





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
