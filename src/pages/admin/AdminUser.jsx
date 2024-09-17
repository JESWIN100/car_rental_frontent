import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../services/adminUsers';
import { axiosInstance } from '../../config/axiosInstance';
import { toast } from 'react-toastify';

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response);
        console.log('users========>', response);
      } catch (error) {
        setError('Error fetching users');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
  
    if (isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/admin/userByDelete/${userId}`, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
  
        const updatedUsers = users.filter((user) => user._id !== userId); // Remove the deleted user from the list
        setUsers(updatedUsers);
        toast.success('User deleted successfully!');
  
        // Optionally, you can reload the page after a delay
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
  
        // Or, you can use setMessage to show a success message
        // setMessage('User deleted successfully!');
  
      } catch (error) {
        toast.error(error.response?.data?.message || 'An error occurred while deleting the user.');
        console.error('Error deleting user:', error);
  
        // Optionally, you can use setMessage to show an error message
        // setMessage('An error occurred while deleting the user.');
      }
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {message && <p>{message}</p>}
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created At</th>
              <th></th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox bg-orange-300"
                      onClick={() => handleDelete(user._id)} // Trigger delete on checkbox click
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        {/* You can add a user image or placeholder here */}
                        <img
                          src={ user.image || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-70">User ID: {user._id}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  {new Date(user.createdAt).toLocaleDateString()} <br />
                  {new Date(user.createdAt).toLocaleTimeString()}
                </td>
                <th>
                  {/* Empty column for action if needed */}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
