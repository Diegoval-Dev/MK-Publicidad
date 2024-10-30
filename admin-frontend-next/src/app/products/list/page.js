"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar iconos de editar y eliminar

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
  
        const response = await fetch("http://localhost:3000/admin/products/list", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error al cargar productos");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchProducts();
  }, []); // Asegúrate de que este useEffect se ejecute cada vez que se monte el componente
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/admin/products/list");
        
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error al cargar productos");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (productId) => {
    sessionStorage.setItem('editProductId', productId); // Guarda el ID en sessionStorage
    router.push('/products/edit'); // Redirige a la página de edición sin el ID en la URL
  };

  const handleDeleteClick = async (productId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:3000/admin/products/${productId}/disable`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Producto eliminado exitosamente");
          setProducts(products.filter(product => product.product_id !== productId));
        } else {
          alert("Error al eliminar producto");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al eliminar producto");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold text-black mb-6">Lista de Productos</h2>
      
      <input
        type="text"
        placeholder="Buscar producto..."
        className="mb-4 p-2 border rounded w-full max-w-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div
            key={product.product_id}
            className="bg-white p-4 rounded-lg shadow flex flex-col justify-between cursor-pointer hover:shadow-lg transition"
          >
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{product.product_name}</h3>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(product.product_id)}
                  className="text-blue-500 hover:text-blue-700"
                  aria-label="Editar producto"
                >
                  <FaEdit />
                </button>
                
                <button
                  onClick={() => handleDeleteClick(product.product_id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Eliminar producto"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
