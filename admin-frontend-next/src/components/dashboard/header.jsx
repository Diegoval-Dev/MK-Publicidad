import Image from 'next/image';
import SalirIcon from '@/app/imags/salir.png'; // Ajuste de la ruta
import ConfigIcon from '@/app/imags/config.png'; // Ajuste de la ruta


export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirige al login tras cerrar sesión
  };

  const handleConfig = () => {
    // Aquí podrías redirigir a una página de configuración o realizar alguna otra acción
    window.alert('Configuración en construcción');
  };

  return (
    <header className="bg-green-700 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-wide">MK Publicidad - Admin</h1>
      <nav className="flex space-x-4 items-center">
        <button 
          onClick={handleConfig}
          className="focus:outline-none"
          aria-label="Configuración"
        >
          <Image
            src={ConfigIcon}
            alt="Configuración"
            width={32}
            height={32}
            className="rounded-md hover:shadow-md transition-all duration-300"
          />
        </button>
        <button 
          onClick={handleLogout}
          className="focus:outline-none"
          aria-label="Cerrar sesión"
        >
          <Image
            src={SalirIcon}
            alt="Cerrar Sesión"
            width={32}
            height={32}
            className="rounded-md hover:shadow-md transition-all duration-300"
          />
        </button>
      </nav>
    </header>
  );
}
