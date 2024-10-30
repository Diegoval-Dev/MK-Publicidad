"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const EditProductPage = () => {
  const router = useRouter();
  const [productData, setProductData] = useState({
    product_name: '',
    product_code: '',
    category_id: '',
    capacity: '',
    size: '',
    image_url: null, // Cambiar a null para almacenar el archivo
  });

  const [categories, setCategories] = useState([]); // Estado para las categorías

  useEffect(() => {
    const productId = sessionStorage.getItem('editProductId');

    if (!productId) {
      router.push('/products');
      return;
    }

    const fetchProductData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:3000/user/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProductData(data);
        } else {
          console.error("Error al cargar los datos del producto");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Error al cargar categorías");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProductData();
    fetchCategories();
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
  
    // Construye el objeto JSON con los datos del producto
    const updatedProductData = {
      product_name: productData.product_name,
      product_code: productData.product_code,
      category_id: productData.category_id,
      capacity: productData.capacity,
      size: productData.size,
      image_url: productData.image_url, // URL de la imagen existente o nueva
    };
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(`http://localhost:3000/admin/products/${sessionStorage.getItem('editProductId')}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json", // Asegura que se envíe como JSON
        },
        body: JSON.stringify(updatedProductData), // Envía el JSON plano
      });
  
      if (response.ok) {
        alert("Producto actualizado exitosamente");
        router.push("/products");
      } else {
        const errorData = await response.json();
        alert(`Error al actualizar producto: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar producto");
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
            <select
              name="category_id"
              id="category_id"
              className="w-full border-gray-300 p-2 rounded focus:border-green-500"
              value={productData.category_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map(category => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
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
        </div>

        <button type="submit" className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
