import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const UserAuth = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with null

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance.get('user/check-user', {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null); // Ensure user is set to null on error
      }
    };

    checkUser();
  }, []);



  return user ? children :
   <div>User not authenticated</div>

   ; 
};
