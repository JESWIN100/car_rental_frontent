import React from 'react';

const Filters = () => {
  return (
    <aside className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-6 mb-10 md:mb-0">
      <h2 className="text-xl font-semibold mb-4">Type</h2>
      <ul className="mb-6">
        <li><input type="checkbox" /> Sport (10)</li>
        <li><input type="checkbox" /> SUV (12)</li>
        <li><input type="checkbox" /> MPV (16)</li>
        <li><input type="checkbox" /> Sedan (20)</li>
        <li><input type="checkbox" /> Coupe (14)</li>
        <li><input type="checkbox" /> Hatchback (14)</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">Capacity</h2>
      <ul className="mb-6">
        <li><input type="checkbox" /> 2 Person (10)</li>
        <li><input type="checkbox" /> 4 Person (12)</li>
        <li><input type="checkbox" /> 6 Person (8)</li>
        <li><input type="checkbox" /> 8 or More (16)</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">Price</h2>
      <input type="range" min="0" max="100" className="w-full mb-2" />
      <p>Max: $100.00</p>
    </aside>
  );
};

export default Filters;
