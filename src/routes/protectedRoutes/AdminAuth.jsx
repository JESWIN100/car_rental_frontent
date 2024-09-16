import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const AdminAuth = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with null

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axiosInstance.get('admin/check-admin', {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null); // Ensure user is set to null on error
      }
    };

    checkAdmin();
  }, []);



  return user ? children :
   <div>Admin not authenticated</div>

   ; 
};
