import { toast } from "react-toastify";
import { axiosInstance } from "../config/axiosInstance";
import Cookies from 'js-cookie';
export const adminLogin = async (loginData) => {
    try {
      const response = await axiosInstance.post('admin/login', loginData, {
        withCredentials: true,
      });
      return response?.data;
    } catch (error) {
      // If the credentials are invalid
      if (error.response?.status === 401 || error.response?.data?.message === 'Invalid credentials') {
        toast.error("Invalid credentials. Please check your email or password.");
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
      }
      console.error(error);
    }
  };
  

  export const adminLogout=async(data)=>{
    try {
      const response = await axiosInstance.post('admin/logout', data, {
        withCredentials: true,
        });
        Cookies.remove('Admintoken');
        return response.data; // Return the response data correctly
      }
      catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
        console.error(error);
        }}