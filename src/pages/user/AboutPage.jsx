import React from 'react';
import { FaCheckCircle, FaMapMarkerAlt, FaCar, FaRegSmileBeam } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-white text-center" style={{ backgroundImage: "url('https://www.shutterstock.com/image-photo/cars-parked-row-on-outdoor-600nw-1378241768.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to Morent</h1>
          <p className="text-lg">Your trusted car rental partner in Kerala, soon to be available across India.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">About Us</h2>
        <p className="text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto">
          At Morent, we take pride in being a Kerala-based car rental service that offers a wide range of vehicles for every occasion. 
          Whether you’re a tourist exploring Kerala’s natural beauty or a local on a business trip, we have the perfect car for you.
        </p>
      </section>

      {/* Mission Section */}
      <section className=" py-12 px-6 text-center">
        <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center">
          Our Mission <FaMapMarkerAlt className="ml-2 text-orange-500" />
        </h3>
        <p className="text-lg text-gray-00 leading-relaxed max-w-3xl mx-auto">
          Our mission is to make travel within Kerala hassle-free with our well-maintained vehicles and seamless service. As we look to the future, we aim to expand our presence across India, offering the same level of service nationwide.
        </p>
      </section>

      {/* Services Section */}
      <section className="py-12 px-6  text-center">
        <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center">
          What We Offer <FaCar className="ml-2 text-orange-500" />
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 w-[250px] text-left flex items-center gap-4">
            <FaCheckCircle className="text-orange-500 text-2xl" />
            <p className="text-lg text-gray-700">Wide range of vehicles (SUVs, Sedans, Hatchbacks)</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 w-[250px] text-left flex items-center gap-4">
            <FaCheckCircle className="text-orange-500 text-2xl" />
            <p className="text-lg text-gray-700">Flexible rental plans (daily, weekly, monthly)</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 w-[250px] text-left flex items-center gap-4">
            <FaCheckCircle className="text-orange-500 text-2xl" />
            <p className="text-lg text-gray-700">24/7 customer support</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 w-[250px] text-left flex items-center gap-4">
            <FaCheckCircle className="text-orange-500 text-2xl" />
            <p className="text-lg text-gray-700">Easy online booking and cancellation</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 w-[250px] text-left flex items-center gap-4">
            <FaCheckCircle className="text-orange-500 text-2xl" />
            <p className="text-lg text-gray-700">Pickup and drop-off services</p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-12 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
        <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center">
          Our Dream <FaRegSmileBeam className="ml-2" />
        </h3>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto">
          We envision becoming a nationally recognized car rental brand, starting from Kerala and expanding across India. Our goal is to offer affordable, quality car rentals with a customer-first approach, wherever you travel.
        </p>
      </section>
    </div>
  );
};

export default About;
