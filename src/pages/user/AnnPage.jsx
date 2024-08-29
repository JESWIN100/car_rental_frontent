import React from 'react';
import image from "../../assets/images/homepage.png";
import { Link } from 'react-router-dom';

export default function AnnPage() {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center p-8 w-full">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-extrabold text-red-600 mb-4 tracking-wide leading-tight">
            CAR RENTAL
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            Experience the convenience and flexibility of our top-rated car rental service.
            Whether you're planning a weekend getaway, a business trip, or need a reliable ride for your daily commute, we offer a wide range of vehicles to suit your needs.
            From compact cars to luxury sedans and SUVs, our fleet is well-maintained and ready to go.
            Enjoy competitive pricing, hassle-free booking, and exceptional customer service that puts you in the driver's seat.
            Choose us for your next journey and travel with confidence.
          </p>
          <Link to="/signup">
            <button className="bg-red-600 hover:bg-red-700 transition duration-300 text-white py-2 px-6 rounded-lg shadow-lg transform hover:scale-105">
              Book Now!
            </button>
          </Link>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 relative">
          <img src={image} alt="Car Rental" className="w-full h-auto rounded-lg shadow-xl transform hover:scale-105 transition duration-300" />
        </div>
      </section>

      {/* Why Choose Us Section */}
<section className="bg-gradient-to-r from-red-500 to-red-700 text-white p-10 mt-12 rounded-lg shadow-xl">
  <div className="text-center space-y-6">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Why Choose Us?</h2>
    <p className="text-lg md:text-xl leading-relaxed">
      Whether you're seeking budget-friendly options or luxury rides, our diverse fleet has you covered. Our 24/7 customer support ensures you're never left stranded, no matter where the road takes you.
    </p>
    <p className="text-lg md:text-xl leading-relaxed">
      Experience the ease of seamless online booking with transparent pricing and zero hidden fees. Rest assured, our vehicles are meticulously maintained for your safety and comfort.
    </p>
    <p className="text-lg md:text-xl leading-relaxed">
      We offer flexible rental plans that fit your schedule, along with comprehensive insurance options and roadside assistance for added peace of mind.
    </p>
    <p className="text-lg md:text-xl font-semibold">
      Your satisfaction is our top priority. Choose us for your car rental needs and discover the difference quality service makes.
    </p>
  </div>
</section>

    </div>
  );
}
