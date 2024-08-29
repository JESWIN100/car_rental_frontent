import { useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const UserAuth = ({ children }) => {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance.get('user/check-user', {
          withCredentials: true,
        });
        console.log(response);
      } catch (error) {
        console.error("Error checking user:", error);
      }
    };

    checkUser();
  }, []);

  return children;
};
