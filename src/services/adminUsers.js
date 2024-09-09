import { toast } from "react-toastify";
import { axiosInstance } from "../config/axiosInstance";



export const fetchUsers= async (params) => {
    try {
      const response = await axiosInstance.get('/admin/users', {
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