import { Link } from 'react-router-dom'; // Use react-router-dom for internal navigation
import React from 'react';

export default function UserFooter() {
  return (
    <div>
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-bold mb-2">Morent</h4>
              <p className="text-gray-600">
                Your reliable car rental service. We provide luxury, sedan, hatchback, and SUV cars for rent at affordable prices.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h5 className="text-md font-semibold mb-2">Contact Us</h5>
              <p className="text-gray-600">Manathavady, Wayanad, 673121, Kerala, India</p>
              <p className="text-gray-600">Phone: 8903382318</p>
            </div>
            <div className="w-full md:w-1/3">
              <h5 className="text-md font-semibold mb-2">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link to="/user/home" className="text-blue-600 hover:underline">Home</Link></li>
                <li><Link to="/user/home/#how-it-works" className="text-blue-600 hover:underline">How it Works</Link></li>
                <li><Link to="/user/home/#why-choose-us" className="text-blue-600 hover:underline">Why Choose Us</Link></li>
                <li><Link to="/#testimonials" className="text-blue-600 hover:underline">Testimonials</Link></li>
                <li><Link to="/payment/contact" className="text-blue-600 hover:underline">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-600">© 2024 Morent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
