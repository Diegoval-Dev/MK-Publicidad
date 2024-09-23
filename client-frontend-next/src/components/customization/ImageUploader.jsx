'use client';

import React from 'react';
import { CustomButton, SubtleButton } from '@styles/styled';

const ImageUploader = ({ images, setImages }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prevImages => [...prevImages, { src: reader.result, left: 50, top: 50, scaleX: 0.5, scaleY: 0.5 }]);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected or file is not accessible.");
    }
  };

  const removeImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input type="file" id="file-upload" className="hidden" onChange={handleImageChange} accept="image/*" />
      <SubtleButton
        type="button"
        onClick={() => document.getElementById('file-upload').click()}
      >
        Cargar Imagen
      </SubtleButton>

      <div className="mt-2 space-y-2">
        {images.map((image, index) => (
          <div key={index} className="flex items-center space-x-2">
            <img src={image.src} alt={`uploaded-${index}`} className="h-16 w-16 object-cover" />
            <button 
              onClick={() => removeText(index)} 
              className="text-sm bg-red-600 text-white hover:bg-red-700 hover:shadow-lg transition duration-300 ease-in-out px-4 py-2 rounded-md"
            >
              Eliminar
            </button>


          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
