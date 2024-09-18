import React from 'react';
// import { MapPin, CalendarDays, CarFront } from 'lucide-react';
import { Car, Calendar, MapPin, ShoppingCart } from "lucide-react";

export default function HowItWork() {
  return (

    <section id="how-it-work" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">How It Works</h1>
          <p className="text-gray-600">
            A high-performing web-based car rental system for any rent-a-car company and website.
          </p>
        </div>
    
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-28 shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
              <Car className="text-gray-500 w-10 h-10" aria-label="Choose Your Car Icon" />
            </div>
            <h2 className="text-xl font-medium mb-2">Choose Your Car</h2>
            <p className="text-gray-600">
              Browse and select your preferred car from our wide range of models. Choose the car that fits your needs and preferences.
            </p>
          </div>
    
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
              <Calendar className="w-10 h-10 text-gray-500" aria-label="Pick-up Date Icon" />
            </div>
            <h2 className="text-xl font-medium mb-2">Select Pick-up Date & Location</h2>
            <p className="text-gray-600">
              Choose your pick-up date, time, and location. You can either select a location from the map or enter the address manually.
            </p>
          </div>
    
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
              <ShoppingCart className="w-10 h-10 text-gray-500" aria-label="Book Your Car Icon" />
            </div>
            <h2 className="text-xl font-medium mb-2">Book Your Car</h2>
            <p className="text-gray-600">
              Finalize your booking by confirming your details. You can also opt for additional services like insurance to ensure a smooth experience.
            </p>
          </div>
        </div>
      </div>
    </section>
    

  );
}
