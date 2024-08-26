import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="font-sans">
      {/* Header Section */}
      <header className="bg-cover bg-center text-white py-24" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1419724017/photo/car-rental-agency-employee-giving-car-keys-to-beautiful-young-woman.webp?b=1&s=612x612&w=0&k=20&c=Qd2P0VYuQGmethhCvWzR51PgZmGEN9YaWl47PiYL-3Q=')" }}>
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to EasyRent Car Rentals</h1>
          <p className="text-lg md:text-xl mb-8">Your go-to platform for convenient and affordable car rentals. Explore our diverse fleet and find the perfect car for your needs.</p>
          <a href="/signup" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">Get Started</a>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Wide Selection</h2>
                <p>Choose from a variety of cars including economy, luxury, SUVs, and more.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Affordable Rates</h2>
                <p>Enjoy competitive pricing with no hidden fees or extra charges.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">24/7 Support</h2>
                <p>Our support team is available around the clock to assist you with any questions or issues.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
{/* About Section */}
<section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">About Us</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            At EasyRent, we pride ourselves on being a reliable car rental service offering a wide range of vehicles for every occasion. Whether you're exploring locally or traveling across the country, we have the perfect car for you.
          </p>
          <Link to={"/about"}>
          <button className="btn glass">Read More</button>
           
          </Link>
           
        </div>
      </section>
      
      
    </div>
  );
};

export default HomePage;
