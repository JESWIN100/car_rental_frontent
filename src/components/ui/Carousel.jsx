import React, { useState } from 'react';

const images = [
  "https://stimg.cardekho.com/images/carexteriorimages/360x240/Mahindra/Thar-ROXX/8438/1723692413550/front-left-side-47.jpg",
  "https://stimg.cardekho.com/images/carexteriorimages/360x240/Mahindra/Thar-ROXX/8438/1723692413550/front-fog-lamp-41.jpg",
  "https://stimg.cardekho.com/images/expert-review/mahindra-thar-roxx/1724252573018/original/Mahindra-Thar-ROXX-0.jpg?tr=w-320",
  "https://stimg.cardekho.com/images/expert-review/mahindra-thar-roxx/1724253660467/original/Mahindra-Thar-ROXX-0.jpg?tr=w-320"
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="min-w-full">
            <img src={src} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
