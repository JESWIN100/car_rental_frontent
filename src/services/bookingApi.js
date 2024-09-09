import { toast } from "react-toastify";
import { axiosInstance } from "../config/axiosInstance";




export const bookingCreate=async(data)=>{
    try {
      const response = await axiosInstance.post('/booking/createBooking', data, {
        withCredentials: true,
        });
        return response.data; // Return the response data correctly
        } catch (error) {
          toast.error(error.response.data.message || "An error occurred");
          console.error(error);
          }
  }


  export const fetchBookingDetails = async (id) => {
    try {
      const response = await axiosInstance.get(`/booking/car/${id}`, {
        withCredentials: true,
      });
      console.log(response.data);
  
      // Return the data for further processing
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };



  export const fetchBookings = async (params) => {
    try {
      const response = await axiosInstance.get('/admin/bookings', {
        params, // Use the `params` option for query parameters in GET requests
        withCredentials: true,
      });
      console.log(response.data); // Log the data from the response
  
      // Optionally, return the data if you need it for further processing
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };




  export const confirmBooking = async (bookingId) => {
    try {
      const response = await axiosInstance.put(`/admin/Adminbooking/${bookingId}/confirm`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred while confirming the booking');
    }
  };



  export const cancelBooking = async (bookingId) => {
    try {
      const response = await axiosInstance.put(`/booking/bookings/${bookingId}/cancel`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred while Cancelling the booking');
    }
  };




  export const fetchTotalBookings = async (params) => {
    try {
      const response = await axiosInstance.get('/admin/totalBooking', {
        params, // Use the `params` option for query parameters in GET requests
        withCredentials: true,
      });
      console.log(response.data); // Log the data from the response
  
      // Optionally, return the data if you need it for further processing
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };


