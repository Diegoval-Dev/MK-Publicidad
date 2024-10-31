//AQUI ESTARA LA PAGINA DE LAS COTIZACIONES, y la creacion de productos de ladmin
"use client";

import Header from '@components/dashboard/header';
import ProductManagement from '@components/dashboard/products';
import Image from 'next/image';
import MKLogo from '../imags/image.png';
import CotizacionIcon from '../imags/cotizacion.png';
import ProductoIcon from '../imags/producto.jpeg';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Header />
      <main className="container mx-auto p-8">
        {/* Dashboard Title */}
        <h1 className="text-center text-4xl font-bold text-green-800 mb-12">DASHBOARD</h1>

        {/* Cards Section */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Quotations Card */}
          <div 
            className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs w-72 hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
            onClick={() => handleNavigation('/quotations')}
          >
            <Image
              src={CotizacionIcon}
              alt="Cotizaciones"
              width={70}
              height={70}
              className="mx-auto mb-4"
            />
            <h2 className="text-green-800 font-bold text-xl mb-2">Cotizaciones</h2>
            <p className="text-gray-600">Gestiona y revisa las cotizaciones de nuestros productos y servicios.</p>
          </div>

          {/* Products Card */}
          <div 
            className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs w-72 hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
            onClick={() => handleNavigation('/products')}
          >
            <Image
              src={ProductoIcon}
              alt="Productos"
              width={70}
              height={70}
              className="mx-auto mb-4"
            />
            <h2 className="text-green-800 font-bold text-xl mb-2">Productos</h2>
            <p className="text-gray-600">Gestiona la creación y administración de nuestros productos.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
