import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchCarsDetails } from '../../services/carsApi';
import { FaCar, FaCalendarAlt, FaGasPump, FaPaintBrush, FaUser, FaGavel, FaTachometerAlt } from 'react-icons/fa';
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
    <div className="container mx-auto py-12 px-6">


{/* Breadcrumbs */}
<div className="hidden md:block breadcrumbs text-sm mb-4">
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
          <Link to="/car/carslist">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-4 w-4 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Car list
          </Link>
        </li>
        <li>
          <span className="inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-4 w-4 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            {carDetails?.brand} {carDetails?.model}
          </span>
        </li>
      </ul>
    </div>



      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Main Car Image and Details */}
        <section className=" shadow-lg rounded-lg p-8">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-5xl font-bold  mb-2">{carDetails?.brand}</h2>
            <p className="text-2xl ">{carDetails?.model}</p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={carDetails?.image}
              alt={carDetails?.name}
              className="w-full h-auto rounded-lg mb-6 shadow-lg border border-gray-200"
            />
            <div className="flex space-x-4 overflow-x-auto">
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

        {/* Car Specifications and Features Section */}
        <section className="shadow-lg rounded-lg p-8">
          <h2 className="text-4xl font-semibold mb-6">Car Specifications</h2>
          
          {/* Car Description */}
          <p className="text-base  mb-8">
            {carDetails?.description}
          </p>

          {/* Specifications Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h1 className="text-2xl font-semibold  mb-4">Key Specifications of {carDetails.brand} {carDetails.model}</h1>
              <table className="w-full border-collapse mb-4">
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">ARAI Mileage</td>
                    <td className="py-2 px-4 border-b border-gray-200">{carDetails.mileage} kmpl</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Engine Displacement</td>
                    <td className="py-2 px-4 border-b border-gray-200">{carDetails.EngineCC} cc</td>
                  </tr>
                  {/* <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Max Power</td>
                    <td className="py-2 px-4 border-b border-gray-200">{carDetails.MaxPower}rpm</td>
                  </tr> */}
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Seating Capacity</td>
                    <td className="py-2 px-4 border-b border-gray-200">{carDetails.capacity} Person</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Boot Space</td>
                    <td className="py-2 px-4 border-b border-gray-200">{carDetails.BootSpace}Litres</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Body Type</td>
                    <td className="py-2 px-4 border-b border-gray-200">{carDetails.Category}</td>
                  </tr>
                </tbody>
              </table>

              {/* <h2 className="text-xl font-semibold text-gray-700 mb-4">Key Features of {carDetails.brand} {carDetails.model}</h2>
              <ul className="list-none p-0 m-0">
                <li className="flex items-center mb-2">Power Steering <span className="tick"></span></li>
                <li className="flex items-center mb-2">Anti-lock Braking System (ABS) <span className="tick"></span></li>
                <li className="flex items-center mb-2">Driver Airbag <span className="tick"></span></li>
                <li className="flex items-center mb-2">Automatic Climate Control <span className="tick"></span></li>
                <li className="flex items-center mb-2">Multi-function Steering Wheel <span className="tick"></span></li>
              </ul> */}
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold  mb-4">Additional Specifications</h2>
              <table className="w-full border-collapse mb-4">
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Fuel Type</td>
                    <td className="py-2 px-4 border-b border-gray-200">{carDetails.fuelType}</td>
                  </tr>
                  {/* <tr>
                    <td className="py-2 px-4 border-b border-gray-200">No. of Cylinders</td>
                    <td className="py-2 px-4 border-b border-gray-200">{carDetails.CylinderNo}</td>
                  </tr> */}
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Max Torque</td>
                    <td className="py-2 px-4 border-b border-gray-200">{carDetails.Torque}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Transmission Type</td>
                    <td className="py-2 px-4 border-b border-gray-200">{carDetails.transmission}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Fuel Tank Capacity</td>
                    <td className="py-2 px-4 border-b border-gray-200">{carDetails.FuelCapacity} Litres</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-200">Year</td>
                    <td className="py-2 px-4 border-b border-gray-200">{carDetails.year} </td>
                  </tr>
                  <tr>
  <td className="py-2 px-4 border-b border-gray-200">Availability</td>
  <td className="py-2 px-4 border-b border-gray-200">
    {carDetails.availability ? "Available" : "Not Available"}
  </td>
</tr>

                </tbody>
              </table>

              {/* <h2 className="text-xl font-semibold text-gray-700 mb-4">Additional Features</h2>
              <ul className="list-none p-0 m-0">
                <li className="flex items-center mb-2">Power Windows Front <span className="tick"></span></li>
                <li className="flex items-center mb-2">Air Conditioner <span className="tick"></span></li>
                <li className="flex items-center mb-2">Passenger Airbag <span className="tick"></span></li>
                <li className="flex items-center mb-2">Alloy Wheels <span className="tick"></span></li>
              </ul> */}
            </div>
          </div>

          {/* Price and Rent Button */}
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold ">{carDetails?.pricePerDay}₹ / day</p>
            <Link to={`/payment/book/${carDetails._id}`}>
              <button className="bg-blue-700 text-white py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors shadow-lg">
                Rent Now
              </button>
            </Link>
          </div>
        </section>
      </div>

      {/* Reviews Section */}
      <ReviewSection carId={carDetails?._id} />
    </div>
  );
}
