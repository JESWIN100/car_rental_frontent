import React, { useState } from 'react';
import WhyChooseUs from './WhyChooseUs';
import HowItWork from './HowItWork';
import Testimonials from './Testimonials';
import CarRentalForm from '../../components/ui/SearchFoarm';
import { Link } from 'react-router-dom';
import video from '../../assets/videos/audimp4.mp4';

export default function UserHomepage() {
  // State to manage the visibility of the CarRentalForm
  const [showForm, setShowForm] = useState(false);

  // Handler to toggle the form visibility
  const handleBookNowClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
  {/* Hero Section */}
  <section className="relative flex items-center justify-center h-screen text-center p-4 sm:p-8 lg:p-12">
    {/* Background Video */}
 

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black opacity-50"></div>

    {/* Content */}
    <div className="relative z-10 p-4 sm:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
        Drive Your Dreams: Premium Cars, Incredible Savings
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6">
        Experience luxury on the road with up to 50% off on rentals. Choose from our wide selection of top-notch vehicles and enjoy unmatched driving pleasure.
      </p>
      <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8">
        Book today and start your journey with confidence, backed by our best-in-class maintenance and customer service.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* <button
          className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
          onClick={handleBookNowClick}
        >
          Book Now!
        </button> */}
        <Link to={'/car/carslist'}>
          <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg font-semibold shadow-md hover:bg-white hover:text-blue-600 transition duration-300">
          Book Now!
          </button>
        </Link>
      </div>
    </div>
  </section>

  {/* Conditionally Render Car Rental Form */}
  {showForm && (
    <section className="py-12">
      <div className="max-w-4xl mx-auto">
        <CarRentalForm />
      </div>
    </section>
  )}

  {/* Additional Sections */}
  <section className="py-16">
    <HowItWork />
  </section>
  <section className="py-16">
    <WhyChooseUs />
  </section>
  <section className="py-16">
    <Testimonials />
  </section>
</div>

  );
}
