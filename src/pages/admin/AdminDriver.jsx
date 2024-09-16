import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';

export default function AdminDriver() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDriverList = async () => {
      try {
        const response = await axiosInstance.get('/admin/driverlist',{
          withCredentials: true,
        });
        setDrivers(response.data.data); // Adjust according to the actual response structure

        console.log("Drivers========>", response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDriverList();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>License Number</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(drivers) && drivers.map((driver) => (
            <tr key={driver._id}>
              <td>{driver._id}</td>
              <td>{driver.firstName} {driver.lastName}</td>
              <td>{driver.driverAge}</td>
              <td>{driver.licenceNumber}</td>
              <td>{driver.mobileNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
