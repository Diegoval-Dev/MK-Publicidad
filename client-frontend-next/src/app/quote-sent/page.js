'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const QuoteSentPage = () => {
  const router = useRouter();

  return (
    <div className="text-center mt-12">
      <h1 className="text-2xl font-bold text-color-tittlesAdmin mb-4">¡Cotización enviada con éxito!</h1>
      <p className="text-color-text mb-6">Revisa tu correo para encontrar la confirmación.</p>
      <button
        onClick={() => router.push('/categorias')}
        className="px-4 py-2 bg-color-button text-white font-bold rounded hover:bg-color-symbols"
      >
        Ir al catálogo
      </button>
    </div>
  );
};

export default QuoteSentPage;
