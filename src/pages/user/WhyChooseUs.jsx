import { DiamondPercent, MapPin, Phone } from 'lucide-react';
import React from 'react';

const WhyChooseUs = () => {
  return (
    <section id='why-choose-us'>

   
    <div className="flex flex-col md:flex-row items-center md:justify-between p-6 md:p-12 ">
      {/* Image Section */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <img 
          src="https://www.gatwickcarandvanrental.com/wp-content/uploads/2018/11/why-choose-us.jpg" 
          alt="Car Rental Service" 
          className="rounded-lg shadow-lg w-full h-auto" 
        />
      </div>
      
      {/* Text Section */}
      <div className="w-full md:w-1/2 md:pl-8">
        <h2 className="text-3xl font-bold text-gray-500 mb-6">Why Choose Us</h2>
        
        <div className="flex items-center mb-14">
          <div className="p-3 bg-gray-200 rounded-full shadow-md">
            <Phone size={24} className="text-gray-800" aria-label="Customer Support Icon" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-700">Customer Support</h3>
            <p className="text-gray-600">
              Our dedicated customer support team is available 24/7 to assist you with any queries.
            </p>
          </div>
        </div>

        <div className="flex items-center mb-14">
          <div className="p-3 bg-gray-200 rounded-full shadow-md">
            <DiamondPercent size={24} className="text-gray-800" aria-label="Best Price Guaranteed Icon" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-700">Best Price Guaranteed</h3>
            <p className="text-gray-600">
              We offer the best prices in the market, guaranteed. Our prices are competitive and affordable.
            </p>
          </div>
        </div>

        <div className="flex items-center mb-14">
          <div className="p-3 bg-gray-200 rounded-full shadow-md">
            <MapPin size={24} className="text-gray-800" aria-label="Many Locations Icon" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-700">Many Locations</h3>
            <p className="text-gray-600">
              We have many locations across the country, making it easy for you to find a location near you.
            </p>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default WhyChooseUs;
