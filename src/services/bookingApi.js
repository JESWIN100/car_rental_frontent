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