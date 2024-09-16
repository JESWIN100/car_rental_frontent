
import { toast } from "react-toastify";
import { axiosInstance } from "../config/axiosInstance";
import Cookies from 'js-cookie';

export const userLogin = async (loginData) => {
    try {
      const response = await axiosInstance.post('user/login', loginData, {
        withCredentials: true,
      });
      return response?.data; // Return the response data correctly
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };

export const userSignup=async(data)=>{
  try {
    const response = await axiosInstance.post('user/create', data, {
      withCredentials: true,
      });
      return response.data; // Return the response data correctly
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
        console.error(error);
        }
}

export const userLogout=async(data)=>{
  try {
    const response = await axiosInstance.post('user/logout', data, {
      withCredentials: true,
      });
      
      Cookies.remove('token');
      return response.data; 
    }
    catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
      }}


      export const fetchUserProfile = async (params) => {
        try {
          const response = await axiosInstance.get('/user/profile', {
            params, // Use the `params` option for query parameters in GET requests
            withCredentials: true,
          });
          console.log("fetchUserProfile",response.data); // Log the data from the response
      
          // Optionally, return the data if you need it for further processing
          return response.data.data;
        } catch (error) {
          toast.error(error.response?.data?.message || "An error occurred");
          console.error(error);
        }
      };
    