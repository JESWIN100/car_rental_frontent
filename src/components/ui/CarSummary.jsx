import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCarsDetails } from "../../services/carsApi";
import CarRentalInfo from "./CarRentalInfo";

export default function CarSummary() {
  const [totalAmount, setTotalAmount] = useState(0); // Add this line
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

  if (loading) return <div className="text-center mt-10 ">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className=" p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Rental Summary</h2>
        <div className="flex flex-col md:flex-row md:space-x-6">
          <img
            src={carDetails.image}
            alt={`Image of ${carDetails.model}`}
            className="w-full md:w-2/4 h-auto object-contain rounded-lg"
          />
          <div className="mt-4 md:mt-0 flex-1">
            <p className="text-xl font-semibold mb-2">Car Model: {carDetails.brand} {carDetails.model}</p>
            <p className="text-xl font-semibold mt-4">Per Day Price: ₹{carDetails.pricePerDay}</p>
            <p className="text-lg mt-2">Registration Number: {carDetails.registrationNumber}</p>
            <p className="text-lg mt-2">
              Availability: 
              <span className={carDetails?.availability ? "text-green-600" : "text-red-600"}>
                {carDetails?.availability ? "Available" : "Not Available"}
              </span>
            </p>
          </div>
        </div>
        {/* <CarRentalInfo setTotalAmount={setTotalAmount} />
        <h3>Total Rental Amount: ₹{totalAmount.toFixed(2)}</h3> */}

      </div>
    </div>
  );
}
