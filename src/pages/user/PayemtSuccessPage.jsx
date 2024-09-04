import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      navigate('/user/home');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
      <div className="mb-6">
        <img 
          src="https://img.freepik.com/premium-vector/success-online-credit-approval-mobile-bank-app-tiny-character-giant-phone_213110-7825.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724976000&semt=ais_hybrid" 
          alt="Payment Success" 
          className="w-2/2 md:w-2/3 lg:w-full shadow-lg rounded-lg"
        />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">
        Your payment is successful
      </h2>
      <p className="text-gray-700 mb-6 ">
        Thank you for using our service. Your payment has been successfully processed. You will receive an email
        with your payment details shortly. <br></br>If you have any questions or concerns, please don't hesitate to
        contact us.
      </p>
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-2"></div>
          <p className="text-gray-700">Redirecting to home page...</p>
        </div>
      ) : (
        <Link to="/user/home" className="text-error transition duration-300">
          Back to Home
        </Link>
      )}
    </div>
  );
}
