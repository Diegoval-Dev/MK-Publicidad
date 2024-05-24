import React, { useState } from 'react';
import Previewbanner1 from '@assets/imgs/Previewbanner1.png';
import Previewbanner2 from '@assets/imgs/Previewbanner2.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const images = [
  Previewbanner1,
  Previewbanner2
];

function PreviewProduct() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden flex items-center mb-6">
      <img
        src={images[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        className="w-full h-auto object-cover rounded-lg"
        style={{ objectPosition: 'center' }}
      />
      <button
        onClick={handlePrevClick}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full focus:outline-none bg-opacity-50"
      >
        <FaChevronLeft size={32} className="text-emerald-950" />
      </button>
      <button
        onClick={handleNextClick}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full focus:outline-none bg-opacity-50"
      >
        <FaChevronRight size={32} className="text-emerald-950" />
      </button>
    </div>
  );
}

export default PreviewProduct;
