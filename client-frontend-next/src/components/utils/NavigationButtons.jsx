'use client';

import { useRouter } from 'next/navigation'; // Importar useRouter de Next.js
import PropTypes from 'prop-types';

function NavigationButtons() {
  const router = useRouter(); // Uso de useRouter para manejar la navegación

  const handleButtonClick = () => {
    router.back(); // Navegar a la página anterior en el historial
  };

  return (
    <div className="place-self-start">
      <button onClick={handleButtonClick} className="py-2 px-4 bg-lime-500 text-black rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>
    </div>
  );
}

NavigationButtons.propTypes = {
  onClick: PropTypes.func,
};

export default NavigationButtons;
