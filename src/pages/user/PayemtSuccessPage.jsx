import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { confirmAdminPayment } from '../../services/adminPaymentApi';
import { fetchUserBookings } from '../../services/bookingApi';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axiosInstance';
import video from '../../assets/videos/Withdrawal Receipt.mp4';

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl w-11/12 md:w-1/3 modal-content transition-transform transform hover:scale-105"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

// Main Page Component
export default function PaymentSuccessPage() {
  const [bookings, setBookings] = useState([]);
  const [confirming, setConfirming] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('user/profile', {
          withCredentials: true,
        });
        setUser(response?.data?.data || {});
      } catch (error) {
        console.log("Error fetching user profile:", error.response?.data?.message || error.message);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserBookings();
        setBookings(response);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchData();
  }, []);
  
  const handleConfirm = async (bookingId) => {
    if (!bookingId) {
      toast.error('No booking found. Please complete the booking process first.');
      return;
    }

    setConfirming(true);
    try {
      await confirmAdminPayment(bookingId);
    } catch (error) {
      toast.error(error.message || 'Error confirming payment');
    } finally {
      setConfirming(false);
    }
  };

  const handleSendEmail = async () => {
    const lastBooking = bookings.length > 0 ? bookings[bookings.length - 1] : null;

    if (!lastBooking) {
      toast.error('No booking found.');
      return;
    }

    const totalAmount = lastBooking.priceperday || 0; 

    try {
      await axiosInstance.post('nodemailer/create', {
        to: "morent369@gmail.com",
        subject: "Journey Details with Morent Car Rentals",
        text: `Dear Admin,

A new car rental booking has been made by a user with Morent Car Rentals. Below are the details:

Booking Details:
- Booking Number: ${lastBooking.bookingNumber || 'N/A'}
- Car: ${lastBooking.carId.model} ${lastBooking.carId.brand} ${lastBooking.carId.year}
- License Plate: ${lastBooking.carId.registrationNumber}
- Fuel Type: ${lastBooking.carId.fuelType}
- Capacity: ${lastBooking.carId.capacity} passengers

Rental Period:
- Pickup Date & Time: ${new Date(lastBooking.startDate).toLocaleDateString()}, ${new Date(lastBooking.startDate).toLocaleTimeString()}
- Drop-off Date & Time: ${new Date(lastBooking.endDate).toLocaleDateString()}, ${new Date(lastBooking.endDate).toLocaleTimeString()}

Pickup Location:
- Location: ${lastBooking.pickupLocation}
- Contact: ${user.phone}

User Details:
- Name: ${user.name}
- Phone: ${user.phone}
- Email: ${user.email}

Payment Details:
- Total Cost: ${totalAmount.toFixed(2)}

Please review the booking and ensure all arrangements are in place.

Regards,
Morent Car Rentals`
      });
    } catch (error) {
      toast.error('Error sending email.');
      console.error("Error sending email:", error.response?.data?.message || error.message);
    }
  };

  const lastBooking = bookings.length > 0 ? bookings[bookings.length - 1] : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-green-400 to-purple-600 p-6 text-center">
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl text-center">
          <div className="mb-8">
            <video className="mx-auto w-3/4 md:w-1/2 h-auto rounded-lg " autoPlay loop muted>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-green-600 mb-6">Payment Successful!</h2>
          <p className="text-gray-700 md:text-lg mb-8">
            Thank you for using our service. Your payment has been successfully processed.
            An email will be sent to you shortly with the payment details. If you have any concerns, feel free to reach out to us.
          </p>

          {lastBooking ? (
            <div key={lastBooking._id}>
              <Link to="/user/home">
                <button
                  onClick={() => {
                    handleConfirm(lastBooking._id);
                    handleSendEmail();
                  }}
                  disabled={confirming}
                  className={`${
                    confirming ? 'opacity-50 cursor-not-allowed' : ''
                  } bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-500 hover:to-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-110`}
                >
                  {confirming ? 'Confirming...' : 'Go to Dashboard'}
                </button>
              </Link>
            </div>
          ) : (
            <p className="text-lg text-red-500">No bookings available.</p>
          )}
        </div>
      </Modal>
    </div>
  );
}
