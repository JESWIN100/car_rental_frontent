import React from 'react';

const CarRentalForm = () => {
  // Options for form fields
  const cities = ['New York', 'Los Angeles', 'Chicago']; // Add more cities as needed


  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-around p-5 bg-gray-100 rounded-lg shadow-lg max-w-screen-xl mx-auto">
      {/* Pick-Up Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4 md:mb-0">
        <div className="flex items-center gap-2 text-base">
          <input type="radio" id="pickup" name="service" defaultChecked />
          <label htmlFor="pickup">Pick-Up</label>
        </div>
        <div className="flex flex-col bg-gray-100 w-full md:w-48">
          <label htmlFor="pickup-location" className="text-gray-600 text-sm mb-1">Locations</label>
          <select id="pickup-location" className="p-2 rounded border border-gray-300 text-sm bg-gray-100">
            <option value="">Select your city</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col bg-gray-100 w-full md:w-32">
          <label htmlFor="pickup-date" className="text-gray-600 text-sm mb-1">Date</label>
          <input id="dropoff-date" type='date' className="p-2 rounded border border-gray-300 text-sm bg-gray-100">
            
          </input>
        </div>
        <div className="flex flex-col bg-gray-100 w-full md:w-32">
          <label htmlFor="pickup-time" className="text-gray-600 text-sm mb-1">Time</label>
          <input id="dropoff-time" type='time' className="p-2 rounded border border-gray-300 text-sm bg-gray-100">
          </input>
        </div>
      </div>

      {/* Drop-Off Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-2 text-base">
          <input type="radio" id="dropoff" name="service" />
          <label htmlFor="dropoff">Drop-Off</label>
        </div>
        <div className="flex flex-col bg-gray-100 w-full md:w-48">
          <label htmlFor="dropoff-location" className="text-gray-600 text-sm mb-1">Locations</label>
          <select id="dropoff-location" className="p-2 rounded border border-gray-300 text-sm bg-gray-100">
            <option value="">Select your city</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col bg-gray-100 w-full md:w-32">
          <label htmlFor="dropoff-date" className="text-gray-600 text-sm mb-1">Date</label>
          <input id="dropoff-date" type='date' className="p-2 rounded border border-gray-300 text-sm bg-gray-100">
            
          </input>
        </div>
        <div className="flex flex-col bg-gray-100 w-full md:w-32">
          <label htmlFor="dropoff-time" className="text-gray-600 text-sm mb-1">Time</label>
          <input id="dropoff-time" type='time' className="p-2 rounded border border-gray-300 text-sm bg-gray-100">
          </input>
        </div>
        <button type="button" className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded cursor-pointer text-sm hover:bg-blue-700">
          Search
        </button>
      </div>
    </div>
  );
};

export default CarRentalForm;
