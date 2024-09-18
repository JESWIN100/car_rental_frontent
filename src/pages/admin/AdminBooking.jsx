import React, { useEffect, useState } from 'react';
import { confirmBooking, fetchAdminBookings, fetchBookings } from '../../services/bookingApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../config/axiosInstance';

export default function AdminBooking() {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // Ensure only one selected booking

  const { id } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAdminBookings();
        setBooking(response);
        console.log("Bookings fetched: ", response);
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

    setConfirming(true);
    try {
      const response = await confirmBooking(bookingId);
      if (response.success) {
        toast.success(response.message);
        const updatedBookings = await fetchBookings();
        setBooking(updatedBookings);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setConfirming(false);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!bookingId) {
      toast.error("Booking ID is not available.");
      return;
    }

    const userConfirmed = window.confirm("Are you sure you want to delete this booking?");
    if (!userConfirmed) {
      toast.info("Booking deletion aborted.");
      return;
    }

    try {
      const response = await axiosInstance.delete(`/booking/deletebookings/${bookingId}`);
      toast.success("Booking deleted successfully!");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while deleting the booking.");
    }
  };

  const handleSelectBooking = (bookingId) => {
    const bookingDetail = booking.find(car => car._id === bookingId);
    setSelectedBooking(bookingDetail);
    
    
  };






  


  const handleSendEmail = async () => {
    if (!selectedBooking) {
      toast.error("No booking details selected.");
      return;
    }

    const { carId, userId, pickupLocation, dropoffLocation, startDate, endDate, startTime, endTime, paymentStatus, status } = selectedBooking;

  
    // Log the recipient email to ensure it's defined
    console.log("Recipient Email:", userId?.email); // Ensure this is not undefined

    if (!userId?.email) {
      toast.error("No recipient email found.");
      return;
    }

    try {
      await axiosInstance.post('nodemailer/create', {
        to: userId.email,
        subject: "Your Car Rental Confirmation - Morent Car Rentals",
        text: `Dear ${userId.name}, your car rental booking with Morent Car Rentals has been confirmed. Please find the details of your reservation below.`,
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <p>Dear ${userId.name},</p>
    
          <p>We are pleased to confirm your car rental booking with <strong>Morent Car Rentals</strong>. Below are the details of your reservation:</p>
    
          <h4 style="color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Booking Information</h4>
          <ul style="list-style-type: none; padding-left: 0;">
            <li><strong>Booking Number:</strong> 789654</li>
            <li><strong>Vehicle:</strong> ${carId.model} ${carId.brand} (${carId.year})</li>
            <li><strong>License Plate:</strong> ${carId.registrationNumber}</li>
            <li><strong>Fuel Type:</strong> ${carId.fuelType}</li>
            <li><strong>Seating Capacity:</strong> ${carId.capacity} passengers</li>
          </ul>
    
          <h4 style="color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Rental Period</h4>
          <ul style="list-style-type: none; padding-left: 0;">
            <li><strong>Pickup Date & Time:</strong> ${new Date(startDate).toLocaleDateString()}, ${startTime}</li>
            <li><strong>Drop-off Date & Time:</strong> ${new Date(endDate).toLocaleDateString()}, ${endTime}</li>
          </ul>
    
          <h4 style="color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Pickup & Drop-off Locations</h4>
          <ul style="list-style-type: none; padding-left: 0;">
            <li><strong>Pickup Location:</strong> ${pickupLocation}</li>
            <li><strong>Drop-off Location:</strong> ${dropoffLocation}</li>
            <li><strong>Contact Number:</strong> ${userId.phone}</li>
          </ul>
    
          <h4 style="color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">Payment Details</h4>
          <p><strong>Price Per Day:</strong> ₹${carId.pricePerDay}</p>
          <p><strong>Payment Status:</strong> ${paymentStatus}</p>
    
          <p>Kindly ensure you arrive at the pickup location at least 15 minutes prior to the scheduled time for a smooth vehicle inspection and handover.</p>
    
          <p>If you have any questions or need further assistance, feel free to contact us at your earliest convenience.</p>
    
          <p>Best regards,<br><strong>Morent Car Rentals Team</strong></p>
        </div>
        `
      });
    
      toast.success("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error.response?.data?.message || error.message);
      toast.error("Error sending email.");
      console.log(error);
    }
    
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <section className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>#</th>
              <th>Image</th>
              <th>Brand & Model</th>
              <th>Booking ID</th>
              <th>Car ID</th>
              <th>User Name</th>
              <th>Pickup Location</th>
              <th>Dropoff Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Booking Status</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((car, index) => (
              <tr key={car._id}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onClick={() => handleSelectBooking(car._id)}
                    />
                  </label>
                </th>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <img
                      src={car.carId.image || "default-image-url"}
                      alt="Car"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </td>
                <td>{car.carId.brand} {car.carId.model}</td>
                <td>{car._id}</td>
                <td>{car.carId._id}</td>
                <td>{car?.userId?.name || "NA"}</td>
                <td>{car.pickupLocation}</td>
                <td>{car.dropoffLocation}</td>
                <td>{new Date(car.startDate).toLocaleDateString()}</td>
                <td>{new Date(car.endDate).toLocaleDateString()}</td>
                <td>{car.startTime}</td>
                <td>{car.endTime}</td>
                <td>{car.status}</td>
                <td>{car.paymentStatus}</td>
                <td>
                  {car.status === 'Pending' && (
                    <button
                      className='btn btn-primary'
                      onClick={() => handleConfirm(car._id)}
                      disabled={confirming}
                    >
                      {confirming ? "Confirming..." : "Confirm Booking"}
                    </button>
                  )}
                  {car.status === 'Cancelled' && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteBooking(car._id)}
                    >
                      Delete Booking
                    </button>
                  )}
                </td>
                <td>
                <button
        className='btn btn-outline btn-accent mt-4'
        onClick={handleSendEmail}
        disabled={!selectedBooking}
      >
        Send Email
      </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* <button
        className='btn btn-outline btn-accent mt-4'
        onClick={handleSendEmail}
        disabled={!selectedBooking}
      >
        Send Email
      </button> */}
    </div>
  );
}
