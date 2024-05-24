function ImageUploader({ setImage }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("File loaded successfully.");
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected or file is not accessible.");
    }
  };

  return (
    <div>
      <input type="file" id="file-upload" className="hidden" onChange={handleImageChange} accept="image/*" />
      <button
        type="button"
        className="text-sm bg-green-500 text-white p-1 rounded hover:bg-green-600"
        onClick={() => document.getElementById('file-upload').click()}
      >
        Cargar Imagen
      </button>
    </div>
  );
}

export default ImageUploader;
