import React, { useEffect, useState } from 'react';
import { confirmBooking, fetchBookings } from '../../services/bookingApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdminBooking() {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirming, setConfirming] = useState(false); // New state for button disabling
  const { id } = useParams(); // Fixed useParams call

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBookings();
        setBooking(response);
        console.log("booking========>", response);
      } catch (error) {
        setError("Error fetching bookings");
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleConfirm = async (bookingId) => {
    if (!bookingId) {
      toast.error("No booking found. Please complete the booking process first.");
      return;
    }

    setConfirming(true); // Disable button
    try {
      const response = await confirmBooking(bookingId);
      console.log("confirmed=====>", response);
      
      if (response.success) {
        toast.success(response.message);
        // Refresh bookings after confirmation
        const updatedBookings = await fetchBookings();
        setBooking(updatedBookings);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setConfirming(false); // Enable button again
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <section className="overflow-x-auto">
        <table className="table w-full">
          {/* Table header */}
          <thead>
            <tr>
              <th>#</th> {/* Index column */}
              <th>Image</th>
              <th>Brand & Model</th>
              <th>Booking ID</th>
              <th>Car ID</th>
              <th>User ID</th>
              <th>Pickup Location</th>
              <th>Dropoff Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {booking.map((car, index) => (
              <tr key={car._id}>
                <td>{index + 1}</td> {/* Index column */}
                <td>
                <div className="avatar">
  <div className="mask mask-squircle h-12 w-12 overflow-hidden">
    <img
      src={car.carId.image || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
      alt="Avatar Tailwind CSS Component"
      className="object-cover w-full h-full" />
  </div>
</div>

                </td>
                <td>{car.carId.brand} {car.carId.model}</td>
                <td>{car._id}</td>
                <td>{car.carId._id}</td>
                <td>{car.userId}</td>
                <td>{car.pickupLocation}</td>
                <td>{car.dropoffLocation}</td>
                <td>{new Date(car.startDate).toLocaleDateString()}</td>
                <td>{new Date(car.endDate).toLocaleDateString()}</td>
                <td>{car.startTime}</td>
                <td>{car.endTime}</td>
                <td>{car.status}</td>
                <td>
                  {car.status === 'Pending' && (
                    <button
                      className='btn btn-primary'
                      onClick={() => handleConfirm(car._id)} // Pass booking ID
                      disabled={confirming} // Disable button when confirming
                    >
                      {confirming ? "Confirming..." : "Confirm Booking"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          {/* Table footer */}
          {/* <tfoot>
            <tr>
              <th>#</th> 
              <th>Image</th>
              <th>Brand & Model</th>
              <th>Booking ID</th>
              <th>Car ID</th>
              <th>Pickup Location</th>
              <th>Dropoff Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </tfoot> */}
        </table>
      </section>
    </div>
  );
}
