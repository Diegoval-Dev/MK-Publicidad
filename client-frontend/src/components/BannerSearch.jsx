import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import useNavigate from '@hooks/useNavigate';

function BannerSearch({ onResults }) {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const { navigate } = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que el texto de búsqueda no esté vacío después de eliminar los espacios
    const trimmedSearchText = searchText.trim();
    if (trimmedSearchText) {
      try {
        console.log(`Enviando búsqueda con la palabra clave: ${trimmedSearchText}`);

        // Realizar la solicitud al backend usando el endpoint correcto
        const response = await fetch(`http://localhost:3000/user/search/categories?keyword=${encodeURIComponent(trimmedSearchText)}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Datos recibidos:', data);
        
        setResults(data.categories || []); // Asegúrate de acceder a la propiedad correcta de la respuesta
        onResults && onResults(data.categories || []); // Notifica al componente padre si es necesario
        
      } catch (error) {
        console.error('Error al buscar categorías:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setResults([]); // Limpia los resultados si es necesario
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            name="search"
            placeholder="Buscar categoría..."
            value={searchText}
            onChange={handleInputChange}
            className="pl-4 border-b-2 border-black-500 pe-20 py-2 rounded-lg focus:outline-none focus:border-green-500 mx-1 shadow-md"
          />
          {searchText && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 focus:outline-none bg-transparent"
            >
              <FaTimes />
            </button>
          )}
        </div>
        <input
          type="submit"
          value="Buscar"
          className="border border-lime-600 px-4 py-2 rounded-lg ml-1 bg-800 text-white hover:bg-lime-600 cursor-pointer bg-lime-500"
        />
        <button className="border border-lime-600 px-4 py-2 rounded-lg ml-1 bg-800 text-white hover:bg-lime-600 cursor-pointer bg-lime-500"  onClick={() => navigate('contact')}>Contáctanos</button>
      </form>


      {/* Mostrar resultados de la búsqueda */}
      <ul className="mt-4">
        {results.map((category, index) => (
          <li key={index} className="py-1">
            {category.name || 'Nombre de categoría no disponible'} {/* Ajusta según la estructura de tus datos */}
          </li>
        ))}
      </ul>
    </div>
  );
}

BannerSearch.propTypes = {
  onResults: PropTypes.func, // onResults es opcional para notificar al componente padre
};

export default BannerSearch;
