"use client";  // Indica que este es un Client Component

import { useRouter } from 'next/navigation';

const ProductsPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-8 shadow-lg rounded-lg text-center max-w-md">
        {/* Logo */}
        <img src="/image.png" alt="MK Publicidad Logo" className="mx-auto mb-4" style={{ maxWidth: '150px', borderRadius: '10px' }} />

        {/* Texto de bienvenida */}
        <h1 className="text-gray-800 text-2xl font-bold mb-4">¡Gestión de Productos!</h1>
        <p className="text-gray-600 mb-8">
          Administra el catálogo de productos de manera fácil y rápida.
        </p>

        {/* Botones */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push('/products/create')}
            className="bg-[#cf4f4d] hover:bg-[#b84745] active:bg-[#a33e3b] text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            Crear Producto
          </button>
          <button
            onClick={() => router.push('/products/list')}
            className="bg-[#78a866] hover:bg-[#628753] active:bg-[#506d44] text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            Modificar Producto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
