import { toast } from "react-toastify";
import { axiosInstance } from "../config/axiosInstance";


export const createCar=async(data)=>{
    try {
      const response = await axiosInstance.post('admin/createCar', data, {
        withCredentials: true,
        });
        return response.data; // Return the response data correctly
        } catch (error) {
          toast.error(error.response?.data?.message || "An error occurred");
          console.error(error);
          }
  }


  export const fetchAdminCarsList= async (params) => {
    try {
      const response = await axiosInstance.get('/admin/cars', {
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

  export const fetchTotalCars = async (params) => {
    try {
      const response = await axiosInstance.get('/admin/total', {
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