"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Using images from public/gallery folder
const images = [
  {
    url: "/gallery/005c7ff0-5885-426a-9a03-f846973c7987.JPG",
    alt: "Therapy session",
  },
  {
    url: "/gallery/2296b393-0309-42ba-b6cc-405569f55368.JPG",
    alt: "Children therapy",
  },
  {
    url: "/gallery/46d06ad3-baa1-4ea7-bdcb-37cff039943c.JPG",
    alt: "Therapy activities",
  },
  {
    url: "/gallery/494bd119-204d-4c5f-9b19-29fb0ae98677.JPG",
    alt: "Learning session",
  },
  {
    url: "/gallery/5bfe9bd1-6666-4281-8420-072ba3d40132.JPG",
    alt: "Supportive environment",
  },
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={index === 0}
          />
        </div>
      ))}

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 text-gray-800 transition-all z-10 shadow-lg hover:shadow-xl"
        aria-label="Previous image"
        type="button"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 text-gray-800 transition-all z-10 shadow-lg hover:shadow-xl"
        aria-label="Next image"
        type="button"
      >
        <FaChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}


