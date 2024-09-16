import React, { useEffect, useState } from 'react';
import { fetchAdminContactList } from '../../../services/adminContact';
import { Table } from 'react-bootstrap'; // Import Table from React Bootstrap

export default function AdminContactList() {
  const [adminContactList, setAdminContactList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetchAdminContactList();
        setAdminContactList(response); // Assuming the response is an array of contacts
      } catch (error) {
        setError("Error fetching contacts");
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContactData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Contact List</h2>
      {error && <p className="text-danger">{error}</p>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {adminContactList.length > 0 ? (
            adminContactList.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.message}</td>
                <td>{new Date(contact.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No contacts available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
