import React from 'react'

export default function userFooter() {
  return (
    <div>
      <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-bold mb-2">FLY WHEEL</h4>
            <p className="text-gray-600">
              Your reliable car rental service. We provide luxury, sedan, hatchback, and SUV cars for rent at affordable prices.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="text-md font-semibold mb-2">Contact Us</h5>
            <p className="text-gray-600">Bitherkad, Gudalur, 643240, Tamil Nadu, India</p>
            <p className="text-gray-600">Phone: 8903382318</p>
          </div>
          <div className="w-full md:w-1/3">
            <h5 className="text-md font-semibold mb-2">Quick Links</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-600 hover:underline">Home</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">About Us</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Our Services</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-600">© 2024 Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  )
}
