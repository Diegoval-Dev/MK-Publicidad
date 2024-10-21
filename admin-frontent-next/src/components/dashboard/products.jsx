'use client';
import { useState } from 'react';

export default function ProductManagement() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');

  const handleCreateProduct = () => {
    // Lógica para crear un nuevo producto
    console.log(`Creando producto: ${productName} con precio: ${price}`);
  };

  return (
    <section className="p-4 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-lg font-bold mb-4">Gestión de Productos</h2>

      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Nombre del producto"
          className="p-2 border border-gray-300 rounded"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Precio del producto"
          className="p-2 border border-gray-300 rounded"
        />

        <button
          onClick={handleCreateProduct}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Crear Producto
        </button>

        {/* Agrega botones para editar/eliminar productos si lo necesitas */}
      </div>
    </section>
  );
}