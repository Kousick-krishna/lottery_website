import React, { useState, useEffect } from "react";
import gold from '../assets/gold.png'; // Import the local gold image

const Carousel = () => {
  const prizes = [
    { prize: "32 gram gold coin", description: "First Prize", imageUrl: gold },
    { prize: "16 gram gold coin", description: "Second Prize", imageUrl: gold },
    { prize: "8 gram gold coin", description: "Third Prize", imageUrl: gold },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Change the slide every 3 seconds (3000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === prizes.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [prizes.length]);

  return (
    <div className="relative w-full bg-gray-200 py-16 overflow-hidden">
      {/* Desktop View: Sliding carousel */}
      <div className="hidden sm:flex justify-center items-center relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {prizes.map((item, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex flex-col items-center justify-center bg-white rounded-xl shadow-md border border-gray-200 mx-4"
            >
              <div className="sm:p-8 md:p-10 p-4 pr-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
                  {item.description}
                </h3>
                {/* Add image between text */}
                <div className="my-4">
                  <img
                    src={item.imageUrl} // Use the imported gold image
                    alt="Gold Coin"
                    className="w-24 h-24 object-contain mx-auto"
                  />
                </div>
                <p className="text-lg md:text-xl text-gray-600 mt-4 text-center">
                  {item.prize}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View: Sliding carousel with smooth transition and pause on each card */}
      <div className="sm:hidden flex justify-center items-center relative">
        <div className="flex">
          {prizes.map((item, index) => (
            <div
              key={index}
              className={`w-72 flex-shrink-0 flex flex-col items-center justify-center bg-white rounded-xl shadow-md border border-gray-200 mx-4 ${
                index !== currentIndex ? "hidden" : ""
              }`}
            >
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 text-center">
                  {item.description}
                </h3>
                {/* Add image between text */}
                <div className="my-4">
                  <img
                    src={item.imageUrl} // Use the imported gold image
                    alt="Gold Coin"
                    className="w-24 h-24 object-contain mx-auto"
                  />
                </div>
                <p className="text-md text-gray-600 mt-2 text-center">
                  {item.prize}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
