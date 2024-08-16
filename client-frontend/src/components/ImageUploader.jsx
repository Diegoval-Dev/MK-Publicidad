import React from 'react';
import { CustomButton } from '../styles/styled'; // Asegúrate de que la ruta es correcta

const ImageUploader = ({ images, setImages }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, { src: reader.result, left: 50, top: 50, scaleX: 0.5, scaleY: 0.5 }]);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected or file is not accessible.");
    }
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div>
      <input type="file" id="file-upload" className="hidden" onChange={handleImageChange} accept="image/*" />
      <CustomButton
        type="button"
        onClick={() => document.getElementById('file-upload').click()}
      >
        Cargar Imagen
      </CustomButton>

      <div className="mt-2 space-y-2">
        {images.map((image, index) => (
          <div key={index} className="flex items-center space-x-2">
            <img src={image.src} alt={`uploaded-${index}`} className="h-16 w-16 object-cover" />
            <button
              type="button"
              className="text-sm text-red-500 hover:text-red-700"
              onClick={() => removeImage(index)}
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
