import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const BookingForm = ({ handleLocationSelect }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [carType, setCarType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
      carType,
    });
    // Add booking logic here
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="pickupLocation">
            <Form.Label>Pickup Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter pickup location"
              value={pickupLocation}
              onChange={(e) => {
                setPickupLocation(e.target.value);
                handleLocationSelect(e.target.value, 'pickup');
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="dropoffLocation">
            <Form.Label>Dropoff Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter dropoff location"
              value={dropoffLocation}
              onChange={(e) => {
                setDropoffLocation(e.target.value);
                handleLocationSelect(e.target.value, 'dropoff');
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="pickupDate">
            <Form.Label>Pickup Date</Form.Label>
            <Form.Control
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="dropoffDate">
            <Form.Label>Dropoff Date</Form.Label>
            <Form.Control
              type="date"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="carType">
        <Form.Label>Car Type</Form.Label>
        <Form.Control
          as="select"
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
        >
          <option value="">Select car type</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Hatchback">Hatchback</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Book Now
      </Button>
    </Form>
  );
};

export default BookingForm;
