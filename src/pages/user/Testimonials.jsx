import React from 'react';

const quotes = [
  {
    quote: "The journey of a thousand miles begins with a single step. Rent a car, take that step.",
    author: "Lao Tzu",
    role: "Ancient Chinese Philosopher",
  },
  {
    quote: "Life is a journey, enjoy the ride with a great car rental experience.",
    author: "Anonymous",
    role: "N/A",
  },
  {
    quote: "The world is a book, and those who do not travel read only one page.",
    author: "Saint Augustine",
    role: "Philosopher",
  },
  {
    quote: "The best way to predict your future is to create it. Start with a road trip.",
    author: "Peter Drucker",
    role: "Management Consultant",
  },
  {
    quote: "Adventure awaits. Rent a car and find your next destination.",
    author: "Anonymous",
    role: "N/A",
  },
  {
    quote: "Travel makes one modest. You see what a tiny place you occupy in the world.",
    author: "Gustave Flaubert",
    role: "Writer",
  },
  {
    quote: "The road to success is always under construction. Enjoy the journey with our rental cars.",
    author: "Lily Tomlin",
    role: "Actress and Comedian",
  },
  {
    quote: "A journey of a thousand miles begins with a single tank of gas.",
    author: "Anonymous",
    role: "N/A",
  },
  {
    quote: "Exploration knows no bounds. Rent a car and discover new horizons.",
    author: "Anonymous",
    role: "N/A",
  },
];

export default function testimonials() {
  return (
    <section id='testimonials'>
      <div className="py-12 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-gray-500 text-center mb-10">Inspirational Travel Quotes</h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-6">
            {quotes.map((quote, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg min-w-[300px] max-w-[300px]">
                <blockquote className="text-gray-700 mb-4 relative pl-6 border-l-4 border-gray-300">
                  <p className="italic">"{quote.quote}"</p>
                </blockquote>
                <h3 className="text-xl font-semibold text-gray-800">{quote.author}</h3>
                <p className="text-gray-600">{quote.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
