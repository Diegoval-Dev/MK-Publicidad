// /pages/products/create.js
import React, { useState } from 'react';
const CreateProductPage = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_code: '',
    category_id: '',
    capacity: '',
    size: '',
    image_url: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes añadir la lógica para enviar la data al backend
    console.log(formData);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="form bg-white p-8 rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="centered-title mb-6">Crear Producto</h2>
        <div>
          <label htmlFor="product_name" className="text-balance">Nombre del Producto</label>
          <input
            type="text"
            name="product_name"
            id="product_name"
            className="form-input"
            placeholder="Ejemplo: Taza personalizada"
            value={formData.product_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="product_code" className="text-balance">Código del Producto</label>
          <input
            type="text"
            name="product_code"
            id="product_code"
            className="form-input"
            placeholder="Ejemplo: TAZ-001"
            value={formData.product_code}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category_id" className="text-balance">Categoría</label>
          <input
            type="number"
            name="category_id"
            id="category_id"
            className="form-input"
            placeholder="Ejemplo: 1"
            value={formData.category_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="capacity" className="text-balance">Capacidad</label>
          <input
            type="text"
            name="capacity"
            id="capacity"
            className="form-input"
            placeholder="Ejemplo: 300ml"
            value={formData.capacity}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="size" className="text-balance">Tamaño</label>
          <input
            type="text"
            name="size"
            id="size"
            className="form-input"
            placeholder="Ejemplo: 10cm x 10cm"
            value={formData.size}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image_url" className="text-balance">URL de la Imagen</label>
          <input
            type="text"
            name="image_url"
            id="image_url"
            className="form-input"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={formData.image_url}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="button mt-4">
          Crear Producto
        </button>
      </form>
    </div>
  );
};
export default CreateProductPage;