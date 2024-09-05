import React, { useState } from 'react';
import WhyChooseUs from './WhyChooseUs';
import HowItWork from './HowItWork';
import Testimonials from './Testimonials';
import CarRentalForm from '../../components/ui/SearchFoarm';
import { Link } from 'react-router-dom';

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
      <section
        className="relative flex items-center justify-center h-screen bg-cover bg-center text-center"
        style={{
          backgroundImage:
            'url("https://cdn.tatlerasia.com/asiatatler/i/my/2018/11/05194917-merc2_cover_1600x1000.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
        <div className="relative z-10 p-8 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-4xl font-extrabold text-white mb-4">
            Drive Your Dreams: Premium Cars, Incredible Savings
          </h1>
          <p className="text-2xl md:text-2xl text-gray-200 mb-6">
            Experience luxury on the road with up to 50% off on rentals. Choose from our wide selection of top-notch vehicles and enjoy unmatched driving pleasure.
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Book today and start your journey with confidence, backed by our best-in-class maintenance and customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
              onClick={handleBookNowClick} // Toggle form visibility on click
            >
              Book Now!
            </button>
            <Link to={'/car/carslist'}>
            <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg font-semibold shadow-md hover:bg-white hover:text-blue-600 transition duration-300">
              See All Cars
            </button>
            </Link>
            
          </div>
        </div>
      </section>

      {/* Conditionally Render Car Rental Form */}
      {showForm && (
        <section className="py-12 ">
          <div className="max-w-4xl ml-64 items-start justify-center">
            <CarRentalForm />
          </div>
        </section>
      )}

      {/* Additional Sections */}
      <section className="py-16 ">
        <HowItWork />
      </section>
      <section className="py-16 ">
        <WhyChooseUs />
      </section>
      <section className="py-16 ">
        <Testimonials />
      </section>
    </div>
  );
}
