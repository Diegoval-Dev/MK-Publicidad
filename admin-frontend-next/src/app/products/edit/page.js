"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const EditProductPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const [productData, setProductData] = useState({
    product_name: '',
    product_code: '',
    category_id: '',
    capacity: '',
    size: '',
    image_url: ''
  });

  useEffect(() => {
    const productId = sessionStorage.getItem('editProductId'); // Obtén el ID de sessionStorage
  
    if (!productId) {
      // Si no hay ID, redirige al usuario (quizás a la lista de productos)
      router.push('/products');
      return;
    }
  
    const fetchProductData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        const response = await fetch(`http://localhost:3000/user/products/${productId}`);
  
        if (response.ok) {
          const data = await response.json();
          setProductData(data); // Cargar los datos actuales en el estado
        } else {
          console.error("Error al cargar los datos del producto");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchProductData();
  }, [router]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/admin/products/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Producto actualizado exitosamente");
        router.push("/products"); // Redirige a la lista de productos después de actualizar
      } else {
        alert("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar el producto");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6 underline">
          Editar Producto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="product_name" className="block text-gray-700 mb-1">Nombre del Producto</label>
          <input
            type="text"
            name="product_name"
            id="product_name"
            className="w-full border-gray-300 p-2 rounded focus:border-green-500"
            value={productData.product_name}
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
            className="w-full border-gray-300 p-2 rounded focus:border-green-500"
            value={productData.product_code}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="category_id" className="block text-gray-700 mb-1">Categoría</label>
          <input
            type="text"
            name="category_id"
            id="category_id"
            className="w-full border-gray-300 p-2 rounded focus:border-green-500"
            value={productData.category_id}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="capacity" className="block text-gray-700 mb-1">Capacidad</label>
          <input
            type="text"
            name="capacity"
            id="capacity"
            className="w-full border-gray-300 p-2 rounded focus:border-green-500"
            value={productData.capacity}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="size" className="block text-gray-700 mb-1">Tamaño</label>
          <input
            type="text"
            name="size"
            id="size"
            className="w-full border-gray-300 p-2 rounded focus:border-green-500"
            value={productData.size}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="image_url" className="block text-gray-700 mb-1">URL de la Imagen</label>
          <input
            type="text"
            name="image_url"
            id="image_url"
            className="w-full border-gray-300 p-2 rounded focus:border-green-500"
            value={productData.image_url}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <button type="submit" className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
        Guardar Cambios
      </button>

      </form>
    </div>
  );
};

export default EditProductPage;
