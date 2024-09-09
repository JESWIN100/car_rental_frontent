// BookingPage Component
import React, { useEffect, useState, useCallback } from 'react';
import { FaCreditCard, FaPaypal, FaBitcoin } from 'react-icons/fa';
import BillingSection from '../../components/ui/BillingSection';
import CarRentalInfo from '../../components/ui/CarRentalInfo';
import CarSummary from '../../components/ui/CarSummary';
import { toast } from 'react-toastify';
import { loadStripe } from "@stripe/stripe-js";
import { axiosInstance } from '../../config/axiosInstance';
import { useParams } from 'react-router-dom';
import { fetchCarsDetails } from '../../services/carsApi';
import { fetchBookingDetails } from '../../services/bookingApi';

export default function BookingPage() {
  const [carDetails, setCarDetails] = useState();
  const [bookingDetails, setBookingDetails] = useState({});
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [termsConsent, setTermsConsent] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { id, carId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carResponse = await fetchCarsDetails(id);
        const bookingResponse = await fetchBookingDetails(id);
        setCarDetails(carResponse);
        setBookingDetails(bookingResponse);
        console.log("Car details:", carResponse);
        console.log("Booking details:", bookingResponse);
      } catch (error) {
        toast.error("Error fetching details");
        console.error("Error fetching details:", error);
      }
    };
    fetchData();
  }, [id]);







  const validateForms = useCallback(() => {
    const requiredFields = ['firstName', 'lastName', 'driverAge', 'licenceNumber', 'pickup-location', 'dropoff-location'];

    for (let fieldId of requiredFields) {
      const fieldElement = document.getElementById(fieldId);
      if (!fieldElement || !fieldElement.value.trim()) {
        toast.error('Please complete all required fields.');
        setIsButtonDisabled(true);
        return false;
      }
    }
    
    setIsButtonDisabled(false);
    return true;
  }, []);

  useEffect(() => {
    const allFormsValid = validateForms();
    setIsButtonDisabled(!allFormsValid || !termsConsent);
  }, [termsConsent, marketingConsent, validateForms]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!termsConsent) {
      toast.error('You must agree to the terms and conditions.');
      return;
    }

    if (!validateForms()) {
      return;
    }

    console.log('Marketing Consent:', marketingConsent);
    console.log('Terms Consent:', termsConsent);
    toast.success("Booking completed successfully");
  };

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

      const sessionResponse = await axiosInstance({
        url: "/payment/create-checkout-session",
        method: "POST",
        data: { carDetails, totalAmount },
      });
      console.log(sessionResponse, "session=======>");

      const sessionId = sessionResponse?.data?.sessionId;

      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error("An error occurred during payment processing. Please try again.");
    }
  };
 
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <BillingSection />
          <CarRentalInfo id={id} carId={carId}  setTotalAmount={setTotalAmount} />

          <div className="bg-white p-4 rounded-lg shadow-md pt-10">
            <h2 className="text-xl font-semibold">
              Confirmation <span className="text-gray-500">Step 3 of 3</span>
            </h2>
            <h3>Total Rental Amount: ₹{totalAmount.toFixed(2)}</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="form-group flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="marketing"
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  checked={marketingConsent}
                  onChange={() => setMarketingConsent(!marketingConsent)}
                />
                <label htmlFor="marketing" className="text-sm font-medium">
                  I agree to receive marketing and newsletter emails. No spam, promised!
                </label>
              </div>
              <div className="form-group flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  checked={termsConsent}
                  onChange={() => setTermsConsent(!termsConsent)}
                />
                <label htmlFor="terms" className="text-indigo-600 hover:underline">
                  I agree to our terms & conditions.
                </label>
              </div>
{/* Confirm Booking Checkbox */}
{/* <div className="form-group mt-4">
          <div className="form-control flex flex-row items-center">
          <input type="checkbox" 
              // onClick={handleConfirm}
              className="checkbox checkbox-primary mr-2" />
            <span className="label-text p-2">:Confirm Booking</span>
            
          </div>
        </div> */}

              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                onClick={makePayment}
                disabled={isButtonDisabled}
              >
                Rent Now
              </button>
            </form>
          </div>
        </div>
        <div className='hidden md:block'>
          <CarSummary />
        </div>
      </div>
    </div>
  );
}