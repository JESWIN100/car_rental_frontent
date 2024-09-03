import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchCarsDetails } from '../../services/carsApi';
import { ShipWheel, UserRound, Car, Fuel, Calendar, PaintBucket, BookCheck, CalendarDays, ChartNoAxesGantt } from 'lucide-react';
import ReviewSection from '../../components/ui/ReviewSection';

export default function CarsDetailsPage() {
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchCarsDetails(id);
        setCarDetails(response);
      } catch (error) {
        setError("Error fetching car details");
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Main Car Image and Details */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800">{carDetails?.brand}</h2>
            <p className="text-xl text-gray-600">{carDetails?.model}</p>
          </div>
          
          <div className="flex flex-col items-center">
            <img
              src={carDetails?.image}
              alt={carDetails?.name}
              className="w-full h-auto rounded-lg mb-6 shadow-md"
            />
            <div className="flex justify-center space-x-4">
              {carDetails?.additionalImages?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Additional Image ${index + 1}`}
                  className="w-1/4 h-auto rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Car Specifications and Rent Section */}
<section className="bg-white shadow-lg rounded-lg p-6">
  <h2 className="text-3xl font-semibold text-gray-700 mb-6">Car Specifications</h2>
  
  {/* Car Description */}
  <p className="text-base text-gray-600 mb-6">
    {carDetails?.description}
  </p>

  {/* Specifications Grid */}
  <div className="grid grid-cols-2 gap-4 text-gray-600 mb-8">
    <div className="flex items-center space-x-2">
      <UserRound className="w-6 h-6 text-gray-500" />
      <span>{carDetails?.capacity} seats</span>
    </div>
    <div className="flex items-center space-x-2">
      <ShipWheel className="w-6 h-6 text-gray-500" />
      <span>{carDetails?.transmission}</span>
    </div>
    <div className="flex items-center space-x-2">
      <Car className="w-6 h-6 text-gray-500" />
      <span>{carDetails?.registrationNumber}</span>
    </div>
    <div className="flex items-center space-x-2">
      <Fuel className="w-6 h-6 text-gray-500" />
      <span>{carDetails?.fuelType}</span>
    </div>
    <div className="flex items-center space-x-2">
      <PaintBucket className="w-6 h-6 text-gray-500" />
      <span>{carDetails?.color}</span>
    </div>
    <div className="flex items-center space-x-2">
      <CalendarDays className="w-6 h-6 text-gray-500" />
      <span>{carDetails?.year}</span>
    </div>
    <div className="flex items-center space-x-2">
      <ChartNoAxesGantt className="w-6 h-6 text-gray-500" />
      <span>{carDetails?.mileage} mileage</span>
    </div>
    <div className="flex items-center space-x-2">
      <BookCheck className="w-6 h-6 text-gray-500" />
      <span className={carDetails?.availability ? "text-green-600" : "text-red-600"}>
        {carDetails?.availability ? "Available" : "Not Available"}
      </span>
    </div>
  </div>

  {/* Price and Rent Button */}
  <p className="text-2xl font-bold text-blue-700 mb-4">{carDetails?.pricePerDay}₹ / day</p>
  <Link to={`/payment/book/${carDetails._id}`}>
  <button className="mt-4 bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-colors shadow-md">
    Rent Now
  </button>
  </Link>
  
</section>


      </div>

      {/* Review Section below */}
      <section className="mt-10 bg-white shadow-lg rounded-lg p-6">
        {/* <h2 className="text-3xl font-semibold text-gray-700 mb-6">Customer Reviews</h2> */}
        <ReviewSection />
      </section>
    </div>
  );
}
