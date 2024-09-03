import { toast } from "react-toastify";
import { axiosInstance } from "../config/axiosInstance";




export const driverCreate=async(data)=>{
    try {
      const response = await axiosInstance.post('/driver/drivers', data, {
        withCredentials: true,
        });
        return response.data; // Return the response data correctly
        } catch (error) {
          toast.error(error.response.data.message || "An error occurred");
          console.error(error);
          }
  }