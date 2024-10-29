"use client";

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
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-black mb-6">Crear Producto</h2>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre del Producto */}
          <div>
            <label htmlFor="product_name" className="block text-gray-700 mb-1">Nombre del Producto</label>
            <input
              type="text"
              name="product_name"
              id="product_name"
              className="w-full border-gray-300 p-2 rounded focus:border-blue-500"
              placeholder="Ejemplo: Taza personalizada"
              value={formData.product_name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Código del Producto */}
          <div>
            <label htmlFor="product_code" className="block text-gray-700 mb-1">Código del Producto</label>
            <input
              type="text"
              name="product_code"
              id="product_code"
              className="w-full border-gray-300 p-2 rounded focus:border-blue-500"
              placeholder="Ejemplo: TAZ-001"
              value={formData.product_code}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Categoría */}
          <div>
            <label htmlFor="category_id" className="block text-gray-700 mb-1">Categoría</label>
            <input
              type="number"
              name="category_id"
              id="category_id"
              className="w-full border-gray-300 p-2 rounded focus:border-blue-500"
              placeholder="Ejemplo: 1"
              value={formData.category_id}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Capacidad */}
          <div>
            <label htmlFor="capacity" className="block text-gray-700 mb-1">Capacidad</label>
            <input
              type="text"
              name="capacity"
              id="capacity"
              className="w-full border-gray-300 p-2 rounded focus:border-blue-500"
              placeholder="Ejemplo: 300ml"
              value={formData.capacity}
              onChange={handleInputChange}
            />
          </div>

          {/* Tamaño */}
          <div>
            <label htmlFor="size" className="block text-gray-700 mb-1">Tamaño</label>
            <input
              type="text"
              name="size"
              id="size"
              className="w-full border-gray-300 p-2 rounded focus:border-blue-500"
              placeholder="Ejemplo: 10cm x 10cm"
              value={formData.size}
              onChange={handleInputChange}
            />
          </div>

          {/* URL de la Imagen */}
          <div>
            <label htmlFor="image_url" className="block text-gray-700 mb-1">URL de la Imagen</label>
            <input
              type="text"
              name="image_url"
              id="image_url"
              className="w-full border-gray-300 p-2 rounded focus:border-blue-500"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={formData.image_url}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Previsualización de Imagen */}
        {formData.image_url && (
          <div className="mt-6 text-center">
            <img src={formData.image_url} alt="Preview" className="inline-block w-32 h-32 object-cover rounded-md shadow-lg" />
          </div>
        )}

        {/* Botón de Envío */}
        <button
          type="submit"
          className="mt-8 w-full bg-[#65a30d] hover:bg-[#4CAF50] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
