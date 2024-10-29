"use client";

import React, { useState } from 'react';

const CreateProductPage = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_code: '',
    category_id: '',
    capacity: '',
    size: '',
    image_url: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image_url: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = new FormData();
    form.append("product_name", formData.product_name);
    form.append("product_code", formData.product_code);
    form.append("category_id", formData.category_id);
    form.append("capacity", formData.capacity);
    form.append("size", formData.size);
    form.append("image", formData.image_url);
  
    try {
      // Recupera el token JWT almacenado (asumiendo que está en localStorage)
      const token = localStorage.getItem("token");
  
      const response = await fetch("http://localhost:3000/admin/products", {
        method: "POST",
        body: form,
        headers: {
          "Authorization": `Bearer ${token}`,  // Añade el token en el encabezado
        },
      });
  
      if (response.ok) {
        alert("Producto creado exitosamente");
      } else {
        const errorData = await response.json();
        alert(`Error al crear producto: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear producto");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-black mb-6">Crear Producto</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div>
            <label htmlFor="image_url" className="block text-gray-700 mb-1">Imagen del Producto</label>
            <input
              type="file"
              name="image_url"
              id="image_url"
              className="w-full border-gray-300 p-2 rounded focus:border-blue-500"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
