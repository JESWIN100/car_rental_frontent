import React from 'react';
import WhyChooseUs from './WhyChooseUs';
import HowItWork from './HowItWork';
import Testimonials from './Testimonials';
import CarRentalForm from '../../components/ui/SearchFoarm';

export default function UserHomepage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center p-8 ">
        <div className="flex-1 p-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to Rent-A-Car</h1>
          <p className="text-lg mb-6">
            Discover a wide range of vehicles to suit your needs, from compact cars to luxury SUVs.
            Explore our seamless booking process and experience exceptional customer service.
            Whether you're planning a road trip or need a temporary vehicle, we've got you covered.
          </p>
          <div className="pt-4 flex flex-col md:flex-row gap-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Book Now!
            </button>
            <button className="bg-transparent border-2 border-gray-500 text-gray-500 py-2 px-4 rounded hover:bg-blue-100">
              See All Cars
            </button>
          </div>
        </div>
        <div className="flex-1 p-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU0bFOIafw0vGpZRulgnpFnEYB6mU4TRaZBA&s"
            alt="Car Rental"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Car Rental Form */}
      <div className="pb-30">
        <CarRentalForm />
      </div>

      {/* Additional Sections */}
      <section className="py-8 ">
        <HowItWork />
      </section>
      <section className="py-8 ">
        <WhyChooseUs />
      </section>
      <section className="py-8 ">
        <Testimonials />
      </section>
    </div>
  );
}
