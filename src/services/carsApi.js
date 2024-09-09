import { toast } from "react-toastify";
import { axiosInstance } from "../config/axiosInstance";


//admin create cars
// export const createCar=async(data)=>{
//   try {
//     const response = await axiosInstance.post('admin/createCar', data, {
//       withCredentials: true,
//       });
//       return response.data; // Return the response data correctly
//       } catch (error) {
//         toast.error(error.response?.data?.message || "An error occurred");
//         console.error(error);
//         }
// }


export const fetchCars = async (params) => {
  try {
    const response = await axiosInstance.get('/car/carList', {
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


export const fetchCarsDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/car/carListById/${id}`, {
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


export const fetchReview = async (id) => {
  try {
    const response = await axiosInstance.get(`/review/getReviewById/${id}`, {
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


export const searchCar = async (data) => {
    try {
      const response = await axiosInstance.get(`/car/search?model=${data.model}`, data, {
        withCredentials: true,
      });
      return response.data; // Return the response data correctly
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };
  