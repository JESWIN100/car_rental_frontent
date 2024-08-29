import React from 'react';

const testimonials = [
  {
    quote: "The service was outstanding! The car was in excellent condition and the staff was incredibly helpful. I'll definitely use this service again.",
    name: "John Doe",
    role: "Businessman",
  },
  {
    quote: "Affordable prices and top-notch customer support. Renting a car has never been this easy and stress-free.",
    name: "Jane Smith",
    role: "Travel Blogger",
  },
  {
    quote: "I was impressed with the variety of vehicles available and how easy it was to pick up and drop off the car. Highly recommend!",
    name: "Emily Johnson",
    role: "Frequent Traveler",
  },
  {
    quote: "Exceptional experience from start to finish. The booking process was seamless, and the car was spotless.",
    name: "Michael Brown",
    role: "Software Engineer",
  },
  {
    quote: "I’ve used many car rental services, but this one stands out for its customer care and efficiency.",
    name: "Sarah Wilson",
    role: "Event Planner",
  },
  {
    quote: "I needed a car last minute, and they delivered beyond my expectations. Fantastic service!",
    name: "David Lee",
    role: "Photographer",
  },
  {
    quote: "Great service and the best prices around. I felt like a valued customer every step of the way.",
    name: "Laura Garcia",
    role: "Real Estate Agent",
  },
  {
    quote: "The car rental experience was smooth, and I appreciated the flexibility in the return process.",
    name: "Robert Davis",
    role: "Sales Manager",
  },
  {
    quote: "From the selection of cars to the ease of booking, everything was perfect. I will use this service again!",
    name: "Jessica Taylor",
    role: "Marketing Consultant",
  },
];

export default function Testimonials() {
  return (
    <section id='testimonials'>

    <div className=" py-12 px-6 md:px-12">
      <h2 className="text-3xl font-bold text-gray-500 text-center mb-10">What Our Customers Say</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg min-w-[300px] max-w-[300px]">
              <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
              <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
              <p className="text-gray-600">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>

  );
}
