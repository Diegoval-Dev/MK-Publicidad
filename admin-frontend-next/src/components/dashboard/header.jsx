export default function Header() {
  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">MK Publicidad - Admin</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
          <li><a href="/quotations" className="hover:underline">Cotizaciones</a></li>
          <li><a href="/products" className="hover:underline">Productos</a></li>
        </ul>
      </nav>
    </header>
  );
}
