import React from 'react';

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
      <button
        type="button"
        className="text-sm bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150"
        onClick={() => document.getElementById('file-upload').click()}
      >
        Cargar Imagen
      </button>

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
