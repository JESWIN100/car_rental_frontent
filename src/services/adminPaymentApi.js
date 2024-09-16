import { axiosInstance } from "../config/axiosInstance";




export const confirmAdminPayment = async (bookingId) => {
  try {
    const response = await axiosInstance.put(
      `/payment/Adminbooking/${bookingId}/confirm`,
      {}, // An empty object for the request body
      { withCredentials: true } // Configuration object
    );
    return response.data;
  } catch (error) {
    console.log(error.response?.data?.message || 'An error occurred while confirming the booking');
  }
};
