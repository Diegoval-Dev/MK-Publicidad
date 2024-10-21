//AQUI ESTARA LA PAGINA DE LAS COTIZACIONES, y la creacion de productos de ladmin

import Header from '@components/dashboard/header';
import Quotations from '@components/dashboard/quotations';
import ProductManagement from '@components/dashboard/products';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4 container mx-auto">
        <Quotations />
        <ProductManagement />
      </main>
    </div>
  );
}