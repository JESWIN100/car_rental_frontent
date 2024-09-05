import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

const AdminCars = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/cars', data);
      alert('Car added successfully');
    } catch (error) {
      console.error('There was an error adding the car:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Add New Car</h4>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                <label className="flex items-center gap-2 input input-bordered">
                  Brand
                  <input
                    type="text"
                    placeholder="Enter car brand"
                    className="grow"
                    {...register('brand', { required: 'Brand is required' })}
                  />
                </label>
                {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
                
                <label className="flex items-center gap-2 input input-bordered">
                  Model
                  <input
                    type="text"
                    placeholder="Enter car model"
                    className="grow"
                    {...register('model', { required: 'Model is required' })}
                  />
                </label>
                {errors.model && <p className="text-red-500">{errors.model.message}</p>}
                
                <label className="flex items-center gap-2 input input-bordered">
                  Year
                  <input
                    type="number"
                    placeholder="Enter car year"
                    className="grow"
                    {...register('year', { required: 'Year is required' })}
                  />
                </label>
                {errors.year && <p className="text-red-500">{errors.year.message}</p>}
                
                <label className="flex items-center gap-2 input input-bordered">
                  Image URLs (comma separated)
                  <input
                    type="text"
                    placeholder="Enter image URLs"
                    className="grow"
                    {...register('image', { required: 'At least one image URL is required' })}
                  />
                </label>
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                
                <label className="flex items-center gap-2 input input-bordered">
                  Price Per Day
                  <input
                    type="number"
                    placeholder="Enter price per day"
                    className="grow"
                    {...register('pricePerDay', { required: 'Price per day is required' })}
                  />
                </label>
                {errors.pricePerDay && <p className="text-red-500">{errors.pricePerDay.message}</p>}
                
                <label className="flex items-center gap-2 input input-bordered">
                  Capacity
                  <input
                    type="number"
                    placeholder="Enter capacity"
                    className="grow"
                    {...register('capacity', { required: 'Capacity is required' })}
                  />
                </label>
                {errors.capacity && <p className="text-red-500">{errors.capacity.message}</p>}
                
                <label className="flex items-center gap-2 input input-bordered">
                  Transmission
                  <select
                    {...register('transmission', { required: 'Transmission is required' })}
                    className="grow"
                  >
                    <option value="">Select Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </label>
                {errors.transmission && <p className="text-red-500">{errors.transmission.message}</p>}
                
                <label className="flex items-center gap-2 input input-bordered">
                  Fuel Type
                  <select
                    {...register('fuelType', { required: 'Fuel type is required' })}
                    className="grow"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </label>
                {errors.fuelType && <p className="text-red-500">{errors.fuelType.message}</p>}
                
                <label className="flex items-center gap-2 input input-bordered">
                  Mileage
                  <input
                    type="number"
                    placeholder="Enter mileage"
                    className="grow"
                    {...register('mileage', { required: 'Mileage is required' })}
                  />
                </label>
                {errors.mileage && <p className="text-red-500">{errors.mileage.message}</p>}
                
                <label className="flex items-center gap-2 input input-bordered">
                  Color
                  <input
                    type="text"
                    placeholder="Enter color"
                    className="grow"
                    {...register('color', { required: 'Color is required' })}
                  />
                </label>
                {errors.color && <p className="text-red-500">{errors.color.message}</p>}
                
                <label className="flex items-center gap-2 input input-bordered">
                  Registration Number
                  <input
                    type="text"
                    placeholder="Enter registration number"
                    className="grow"
                    {...register('registrationNumber', { required: 'Registration number is required' })}
                  />
                </label>
                {errors.registrationNumber && <p className="text-red-500">{errors.registrationNumber.message}</p>}
                
                <label className="flex items-center gap-2 input input-bordered">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...register('availability')}
                    defaultChecked
                  />
                  Available
                </label>
                
                <label className="flex items-center gap-2 input input-bordered">
                  Description
                  <textarea
                    placeholder="Enter description"
                    className="grow"
                    {...register('description', { required: 'Description is required' })}
                  />
                </label>
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                
                <Button variant="primary" type="submit" className="mt-3">
                  Add Car
                </Button>
              </form>
            </Card.Body>
            <Card.Footer className="text-center">
              <small>&copy; 2024 Your Company</small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCars;
