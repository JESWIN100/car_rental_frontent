import React, { useEffect, useState } from 'react';
import { cancelBooking, fetchBookings } from '../../services/bookingApi';
import { axiosInstance } from '../../config/axiosInstance';
import { Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import CarRentalInfo from '../../components/ui/CarRentalInfo';
import { toast } from 'react-toastify';
import ReviewForm from '../../components/ui/ReviewForm'; // Import the ReviewForm component

const statusStyles = {
  Available: 'bg-green-200 text-green-800',
  Booked: 'bg-red-200 text-red-800',
  Pending: 'bg-yellow-200 text-yellow-800',
  Cancelled: 'bg-gray-200 text-gray-800',
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

export default function BookingList() {
  const [user, setUser] = useState({});
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const userId = user._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('user/profile', {
          withCredentials: true,
        });
        setUser(response?.data?.data);
        console.log("fetchUser", response.data.data);
      } catch (error) {
        console.log("Error fetching user profile:", error.response?.data?.message || error.message);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBookings();
        const userBookings = response.filter(booking => booking.userId === userId);
        setCars(userBookings);
        console.log("booking========>", response);
      } catch (error) {
        setError("There was an issue fetching your bookings. Please try again later.");
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const calculateAmount = (startDate, startTime, endDate, endTime, pricePerDay) => {
    if (!startDate || !startTime || !endDate || !endTime || isNaN(pricePerDay)) {
      console.error("Invalid data for calculating the amount.");
      return 0;
    }

    try {
      const pickupDateTime = new Date(`${startDate.split('T')[0]}T${startTime}`);
      const dropoffDateTime = new Date(`${endDate.split('T')[0]}T${endTime}`);

      if (isNaN(pickupDateTime.getTime()) || isNaN(dropoffDateTime.getTime())) {
        console.error("Invalid date format.");
        return 0;
      }

      const diffInMilliseconds = dropoffDateTime - pickupDateTime;

      if (diffInMilliseconds < 0) {
        console.error("End date must be after start date.");
        return 0;
      }

      const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
      const total = diffInDays * parseFloat(pricePerDay);
      return total;
    } catch (error) {
      console.error("Error in amount calculation:", error);
      return 0;
    }
  };

  const cancelBookingHandler = async (bookingId) => {
    if (!bookingId) {
      toast.error("Booking ID is not available.");
      return;
    }

    const userConfirmed = window.confirm("Are you sure you want to cancel this booking?");
    if (!userConfirmed) {
      toast.info("Booking cancellation aborted.");
      return;
    }

    try {
      const response = await axiosInstance.put(`/booking/bookings/${bookingId}/cancel`);
      toast.success("Booking canceled successfully!");
      window.location.reload();
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while Cancelling the booking");
      throw new Error(error.response?.data?.message || "An error occurred while Cancelling the booking");
    }
  };

  const DeleteBookingHandler = async (bookingId) => {
    if (!bookingId) {
      toast.error("Booking ID is not available.");
      return;
    }

    const userConfirmed = window.confirm("Are you sure you want to Delete this booking?");
    if (!userConfirmed) {
      toast.info("Booking Delete aborted.");
      return;
    }

    try {
      const response = await axiosInstance.delete(`/booking/deletebookings/${bookingId}`);
      toast.success("Booking Deleted successfully!");
      window.location.reload();
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while Deleteing the booking");
      throw new Error(error.response?.data?.message || "An error occurred while Deleteing the booking");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <p className="bg-red-200 text-red-800 p-4 rounded-md">{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <section className="cars">
        <div className="section-title flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Your Booked Cars</h2>
        </div>

        {cars.length === 0 ? (
          <div className="flex justify-center items-center mt-12">
            <p className="text-gray-600 text-xl">You have no bookings yet. Start booking your favorite cars!</p>
          </div>
        ) : (
          <motion.div
            className="cars-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                }
              }
            }}
          >
            {cars.map(car => {
              const amount = calculateAmount(
                car.startDate,
                car.startTime,
                car.endDate,
                car.endTime,
                car.carId.pricePerDay
              );
              return (
                <motion.div
                  key={car._id}
                  className="card card-compact bg-white shadow-xl rounded-lg overflow-hidden"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <figure className="relative">
                    <img
                      src={car.carId.image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                      alt={car.carId.model || "Car image"}
                      className="w-full h-48 object-cover"
                    />
                    <span className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[car.status]}`}>
                      {car.status}
                    </span>
                  </figure>
                  <div className="card-body p-4">
                    <h2 className="card-title text-2xl font-semibold mb-2">{car.carId.brand} {car.carId.model}</h2>
                    <h3>Total Rental Amount: ₹{amount.toFixed(2)}</h3>
                    <p className="text-gray-600">Capacity: {car.carId.capacity} seats</p>
                    <p className="text-gray-600">Booked on: {new Date(car.startDate).toLocaleDateString()}</p>
                    <div className="card-actions justify-end mt-4">
                      {car.status !== 'Cancelled' && (
                        <button
                          className="btn btn-error"
                          onClick={() => cancelBookingHandler(car._id)}
                        >
                          Cancel Booking
                        </button>
                      )}
                      {car.status === 'Cancelled' && (
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => DeleteBookingHandler(car._id)}
                        >
                          Delete Booking
                        </button>
                      )}
                        {(car.status === 'Cancelled' || car.status === 'Completed') && (
                    <div className="review-form ">
                      <ReviewForm carId={car.carId._id} userId={userId} />
                    </div>
                    )}
                    </div>
                    {/* {(car.status === 'Cancelled' || car.status === 'Completed') && (
                    <div className="review-form mt-4">
                      <ReviewForm carId={car.carId._id} userId={userId} />
                    </div>
                    )} */}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          
        )}
      </section>
    </div>
  );
}
