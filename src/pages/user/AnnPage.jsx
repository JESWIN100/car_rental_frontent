import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaMoneyCheckAlt, FaHeadset, FaShieldAlt } from 'react-icons/fa';
import image from "../../assets/images/HomePoster.jpg";
import Header from '../../components/Header';

export default function AnnPage() {
  return (
    <div className="font-sans  min-h-screen">
   {/* Hero Section */}
   <Header/>
   <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})` }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative flex flex-col md:flex-row items-center p-8 md:p-16 w-full h-screen bg-gradient-to-t from-black via-transparent to-transparent">
          <div className="w-full md:w-1/2 text-center md:text-left z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Discover Your Perfect Ride
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8">
              Whether it's a weekend escape, a business journey, or a daily commute, our diverse fleet ensures you'll find the right vehicle. Enjoy seamless booking, competitive rates, and exceptional service tailored to your needs.
            </p>
            <Link to="/signup">
              <button className="bg-red-600 hover:bg-red-700 transition duration-300 text-white py-3 px-8 rounded-lg shadow-lg transform hover:scale-105">
                Book Your Car
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="p-8 mt-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 ">
          Why Choose Us?
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className=" p-6 rounded-lg shadow-lg flex items-start space-x-6 transform hover:scale-105 transition duration-300">
            <div className="bg-red-100 text-red-600 p-4 rounded-full">
              <FaCar className="text-3xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Wide Range of Vehicles</h3>
              <p className="text-gray-700">Choose from a diverse selection of vehicles, from budget-friendly options to luxury rides, ensuring the perfect fit for your journey.</p>
            </div>
          </div>
          <div className=" p-6 rounded-lg shadow-lg flex items-start space-x-6 transform hover:scale-105 transition duration-300">
            <div className="bg-red-100 text-red-600 p-4 rounded-full">
              <FaMoneyCheckAlt className="text-3xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-gray-700">Enjoy clear, competitive pricing with no hidden fees, ensuring a straightforward and hassle-free rental experience.</p>
            </div>
          </div>
          <div className=" p-6 rounded-lg shadow-lg flex items-start space-x-6 transform hover:scale-105 transition duration-300">
            <div className="bg-red-100 text-red-600 p-4 rounded-full">
              <FaHeadset className="text-3xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-700">Our dedicated customer support team is available around the clock, ensuring assistance whenever and wherever you need it.</p>
            </div>
          </div>
          <div className=" p-6 rounded-lg shadow-lg flex items-start space-x-6 transform hover:scale-105 transition duration-300">
            <div className="bg-red-100 text-red-600 p-4 rounded-full">
              <FaShieldAlt className="text-3xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Safety & Insurance</h3>
              <p className="text-gray-700">Travel with confidence knowing our vehicles are well-maintained and covered by comprehensive insurance options for your peace of mind.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
