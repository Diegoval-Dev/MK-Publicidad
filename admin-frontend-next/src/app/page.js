"use client";  // Indica que este es un Client Component

import { useRouter } from 'next/navigation';

const WelcomePage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg text-center max-w-md">
        {/* Logo */}
        <img src="/image.png" alt="MK Publicidad Logo" className="mx-auto mb-4" style={{ maxWidth: '150px', borderRadius: '10px' }} />

        {/* Texto de bienvenida */}
        <h1 className="text-gray-800 text-2xl font-bold mb-4">¡Bienvenido!</h1>
        <p className="text-gray-600 mb-8">
          Administra el catálogo de MK Publicidad de manera fácil y rápida.
        </p>

        {/* Botones */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push('/login')}
            className="bg-[#65a30d] hover:bg-[#4CAF50] active:bg-[#426b1f] text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            Iniciar Sesión
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
