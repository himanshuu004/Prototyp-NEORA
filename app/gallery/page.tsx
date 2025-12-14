"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

// Gallery images from public/gallery folder
const galleryImages = [
  { url: "/gallery/005c7ff0-5885-426a-9a03-f846973c7987.JPG", alt: "Therapy session" },
  { url: "/gallery/2296b393-0309-42ba-b6cc-405569f55368.JPG", alt: "Children therapy" },
  { url: "/gallery/46d06ad3-baa1-4ea7-bdcb-37cff039943c.JPG", alt: "Therapy activities" },
  { url: "/gallery/494bd119-204d-4c5f-9b19-29fb0ae98677.JPG", alt: "Learning session" },
  { url: "/gallery/5bfe9bd1-6666-4281-8420-072ba3d40132.JPG", alt: "Supportive environment" },
  { url: "/gallery/79ab4111-df96-4bd8-806d-929e963fc0b2.JPG", alt: "Play therapy" },
  { url: "/gallery/d3263e16-976f-4a9f-8842-a2e3b75dadf3.JPG", alt: "Therapy room" },
  { url: "/gallery/e3adc225-888a-426e-9deb-70bc753adbc8.JPG", alt: "Activity session" },
  { url: "/gallery/e57a6dc9-497e-44bd-9064-cef0b60fd708.JPG", alt: "Therapy equipment" },
  { url: "/gallery/IMG_2647.JPEG", alt: "Therapy session" },
  { url: "/gallery/IMG_2650%202.JPEG", alt: "Children activities" },
  { url: "/gallery/IMG_2650.JPEG", alt: "Therapy environment" },
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const lightboxPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const lightboxNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev! + 1) % galleryImages.length);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4" style={{ color: 'rgba(37, 142, 203)' }}>
          Gallery
        </h1>
        <p className="text-center text-gray-600 mb-12">
          A glimpse into our therapy environment and activities
        </p>

        {/* Slider Section */}
        <div className="mb-12">
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-white">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            ))}

            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 text-gray-800 transition-all z-10 shadow-xl hover:shadow-2xl hover:scale-110"
              aria-label="Previous image"
              type="button"
              style={{ color: 'rgba(29, 144, 202)' }}
            >
              <FaChevronLeft size={24} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 text-gray-800 transition-all z-10 shadow-xl hover:shadow-2xl hover:scale-110"
              aria-label="Next image"
              type="button"
              style={{ color: 'rgba(29, 144, 202)' }}
            >
              <FaChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all shadow-lg ${
                    index === currentIndex 
                      ? "bg-white scale-125" 
                      : "bg-white bg-opacity-60 hover:bg-opacity-80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => openLightbox(idx)}
            >
              <div className="relative h-64">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close"
              type="button"
            >
              <FaTimes size={32} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                lightboxPrevious();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-4 text-white transition-all z-10"
              aria-label="Previous image"
              type="button"
            >
              <FaChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                lightboxNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-4 text-white transition-all z-10"
              aria-label="Next image"
              type="button"
            >
              <FaChevronRight size={24} />
            </button>

            <div 
              className="relative w-full h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage].url}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
