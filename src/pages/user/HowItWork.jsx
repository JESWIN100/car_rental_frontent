import React from 'react';
import { MapPin, CalendarDays, CarFront } from 'lucide-react';

export default function HowItWork() {
  return (
    <section id='how-it-work' className="0 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">How It Works</h1>
          <p className="text-gray-600">
            A high-performing web-based car rental system for any rent-a-car company and website.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-28  shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
              <MapPin className="text-gray-500 w-10 h-10" aria-label="Location Icon" />
            </div>
            <h2 className="text-xl font-medium mb-2">Choose Location</h2>
            <p className="text-gray-600">
              Choose your location from the map or enter the address in the search bar. You can also filter by various criteria.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
              <CalendarDays className="w-10 h-10 text-gray-500" aria-label="Pick-up Date Icon" />
            </div>
            <h2 className="text-xl font-medium mb-2">Pick-up Date</h2>
            <p className="text-gray-600">
              Select your pick-up date and time. You can choose a specific time or a range of dates.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
              <CarFront className="w-10 h-10 text-gray-500" aria-label="Book Your Car Icon" />
            </div>
            <h2 className="text-xl font-medium mb-2">Book Your Car</h2>
            <p className="text-gray-600">
              Select your preferred car model and confirm your booking. You can also add additional services like insurance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
