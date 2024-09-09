import { FuelIcon, ShipWheel, UsersRound, Heart } from "lucide-react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const CarItem = ({ car, toggleWishlist, isInWishlist }) => (
  <div className="car-item bg-white rounded-lg p-4 shadow-lg relative">
    <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full h-40 object-cover rounded-lg mb-4" />
    <Heart
      onClick={() => toggleWishlist(car._id)}
      className={`absolute top-4 right-4 cursor-pointer ${isInWishlist(car._id) ? 'text-red-500 fill-red-500' : 'text-gray-400 fill-gray-400'}`}
      size={24}
    />
    <h3 className="text-xl font-bold mb-2">{car.brand}</h3>
    <p className="text-gray-500 mb-4">{car.model}</p>
    <div className="car-details flex justify-between items-center mb-4">
      <div className="flex items-center">
        <FuelIcon className="mr-2" />
        <span>{car.fuelType}</span>
      </div>
      <div className="flex items-center">
        <ShipWheel className="mr-2" />
        <span>{car.transmission}</span>
      </div>
      <div className="flex items-center">
        <UsersRound className="mr-2" />
        <span>{car.capacity}</span>
      </div>
    </div>
    <div className="car-price flex justify-between items-center">
      <span className="text-xl font-bold">{car.pricePerDay}₹</span>
      <Link to={`/car/car-details/${car._id}`}>
        <button className="btn bg-blue-500 text-white py-2 px-4 rounded">More Details</button>
      </Link>
    </div>
  </div>
);
export default CarItem;