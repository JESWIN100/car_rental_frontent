// BookingPage Component
import React, { useEffect, useState, useCallback } from 'react';
import { FaCreditCard, FaPaypal, FaBitcoin } from 'react-icons/fa';
import BillingSection from '../../components/ui/BillingSection';
import CarRentalInfo from '../../components/ui/CarRentalInfo';
import CarSummary from '../../components/ui/CarSummary';
import { toast } from 'react-toastify';
import { loadStripe } from "@stripe/stripe-js";
import { Link, useParams } from 'react-router-dom';
import { fetchCarsDetails } from '../../services/carsApi';
import { fetchBookingDetails } from '../../services/bookingApi';
import { axiosInstance } from '../../config/axiosInstance';

export default function BookingPage() {
  const [carDetails, setCarDetails] = useState();
  const [bookingDetails, setBookingDetails] = useState({});
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [termsConsent, setTermsConsent] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [mailer, setMailer] = useState({});
  const [emailStatus, setEmailStatus] = useState(''); 
  const [user,setUser]=useState({})
  const [UserBooking, setUserBooking] = useState();
  const [lastBooking, setLastBooking] = useState(null);
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



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('user/profile', {
          withCredentials: true,
        });
        setUser(response?.data?.data || {});
        console.log("user===>",response.data.data);
        
      } catch (error) {
        setError("Error fetching user profile.");
        console.log("Error fetching user profile:", error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  

  // useEffect(() => {
  //   if (!user._id) return; // Exit if user ID is not available

  //   const fetchBookingByUserId = async () => {
  //     try {
  //       const response = await axiosInstance.get(`/booking/carUser/${user._id}`, { withCredentials: true });
  //       const bookings = response?.data?.data || [];
  //       setUserBooking(bookings);

  //       if (bookings.length > 0) {
  //         const lastBooking = bookings[bookings.length - 1];
  //         setLastBooking(lastBooking);
  //       }
  //     } catch (error) {
  //       console.log("Error fetching user bookings:", error.response?.data?.message || error.message);
  //     }
  //   };

  //   fetchBookingByUserId();
  //   const intervalId = setInterval(fetchBookingByUserId, 5000); // Poll every 5 seconds

  //   return () => clearInterval(intervalId);
  // }, [user._id]);


  

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
        withCredentials: true,
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
 

 

//   const handleSendEmail = async () => {
//     try {
      
//       const response = await axiosInstance.post('nodemailer/create', {
//         to: user.email, // Send email to the user's email
//         subject: "Journey Details with Morent Car Rentals",
//         text: `Dear ${user.name},
//   Your car rental booking with Morent Car Rentals has been confirmed!
//   Below are the details of your rental:
  
//   Booking Details for ${bookingDetails.createdAt}
//   Booking Number: 789654
//   Car: ${carDetails.model} ${carDetails.brand} ${carDetails.year}
//   License Plate: ${carDetails.registrationNumber}
//   Fuel Type: ${carDetails.fuelType}
//   Capacity: ${carDetails.capacity} passengers
  
//   Rental Period:
//   Pickup Date & Time: 19/07/2024, 08:00 AM
//   Drop-off Date & Time: 22/07/2024, 08:00 AM
  
//   Pickup Location:
//   XYZ Car Rentals, Neeleswaram
//   Contact: 8281765533
  
//   Payment Details:
//   Total Cost: $150
  
//   Please arrive at the pickup location 15 minutes before the scheduled time for vehicle inspection.

//   Regards,
//   Morent Car Rentals`,
//       html: `
//        <p style="font-family: Arial, sans-serif; color: #333;">
//   Dear ${user.name},
// </p>

// <p style="font-family: Arial, sans-serif; color: #333;">
//   🚗 Your car rental booking with <strong>Morent Car Rentals</strong> has been confirmed!
// </p>

// <h4 style="font-family: Arial, sans-serif; color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">
//   Booking Details for ${new Date(lastBooking.createdAt).toLocaleDateString()} 🎫
// </h4>
// <ul style="font-family: Arial, sans-serif; color: #333; list-style-type: none; padding-left: 0;">
//   <li><strong>Booking Number:</strong> 789654</li>
//   <li><strong>Car:</strong> ${carDetails.model} ${carDetails.brand} (${carDetails.year})</li>
//   <li><strong>License Plate:</strong> ${carDetails.registrationNumber}</li>
//   <li><strong>Fuel Type:</strong> ${carDetails.fuelType}</li>
//   <li><strong>Capacity:</strong> ${carDetails.capacity} passengers</li>
// </ul>

// <h4 style="font-family: Arial, sans-serif; color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">
//   Rental Period 📅
// </h4>
// <ul style="font-family: Arial, sans-serif; color: #333; list-style-type: none; padding-left: 0;">
//   <li><strong>Pickup Date & Time:</strong> ${new Date(lastBooking.startDate).toLocaleDateString()}, ${new Date(lastBooking.startDate).toLocaleTimeString()}</li>
//   <li><strong>Drop-off Date & Time:</strong> ${new Date(lastBooking.endDate).toLocaleDateString()}, ${new Date(lastBooking.endDate).toLocaleTimeString()}</li>
// </ul>

// <h4 style="font-family: Arial, sans-serif; color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">
//   Pickup Location 🗺
// </h4>
// <ul style="font-family: Arial, sans-serif; color: #333; list-style-type: none; padding-left: 0;">
//   <li><strong>Location:</strong> ${lastBooking.pickupLocation}</li>
//   <li><strong>Contact:</strong> ${user.phone}</li>
// </ul>

// <h4 style="font-family: Arial, sans-serif; color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">
//   Payment Details 💳
// </h4>
// <p style="font-family: Arial, sans-serif; color: #333;">
//   <strong>Total Cost:</strong> ₹700
// </p>

// <p style="font-family: Arial, sans-serif; color: #333;">
//   Please arrive at the pickup location 15 minutes before the scheduled time for vehicle inspection.
// </p>

// <p style="font-family: Arial, sans-serif; color: #333;">
//   Regards,<br />
//   <strong>Morent Car Rentals</strong>
// </p>

        
//       `


//       });
      
//       setMailer(response?.data || {});
//       setEmailStatus('Email sent successfully!');
//       toast.success("Email sent successfully!");
//     } catch (error) {
//       console.log(error);
//       setEmailStatus('Error sending email.');
//       console.error("Error sending email:", error.response?.data?.message || error.message);
//     }
//   };
  




  return (
<div className="container mx-auto p-6 md:p-8">

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
        <Link to={`/car/car-details/${carDetails?._id}`}>

          <span className="inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-4 w-4 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            {carDetails?.brand} {carDetails?.model}
          </span>
          </Link>
        </li>
        <li>
          <span className="inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-4 w-4 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Booking
          </span>
        </li>
      </ul>
    </div>



  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-6">
      <BillingSection />
      <CarRentalInfo id={id} carId={carId} setTotalAmount={setTotalAmount} />

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">
          Confirmation <span className="text-gray-600">Step 3 of 3</span>
        </h2>
        <h3 className="text-lg font-semibold mb-4">
          Total Rental Amount: <span className="text-gray-800">₹{totalAmount.toFixed(2)}</span>
        </h3>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="marketing"
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              checked={marketingConsent}
              onChange={() => setMarketingConsent(!marketingConsent)}
            />
            <label htmlFor="marketing" className="text-sm font-medium">
              I agree to receive marketing and newsletter emails. No spam, promised!
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="terms"
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              checked={termsConsent}
              onChange={() => setTermsConsent(!termsConsent)}
            />
            <label htmlFor="terms" className="text-sm">
              I agree to our{" "}
              <a
                href="/terms-and-conditions" // Update this URL to your terms and conditions page
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                terms & conditions
              </a>
              .
            </label>
          </div>
          {/* <div className="flex items-center space-x-3 mt-4">
            <input
              type="checkbox"
              id="confirmBooking"
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              // onClick={handleConfirm}
            />
            <label htmlFor="confirmBooking" className="text-sm font-medium">
              Confirm Booking
            </label>
          </div> */}
          <button
            type="submit"
            className="w-1/3 bg-indigo-600 text-white py-3 rounded-2xl shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50"
            onClick={() => { makePayment(); }}
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