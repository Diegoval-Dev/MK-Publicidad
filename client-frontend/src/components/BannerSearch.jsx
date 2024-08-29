import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import useNavigate from '@hooks/useNavigate';

function BannerSearch({ onResults, onClear }) {
  const [searchText, setSearchText] = useState('');
  const { navigate } = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedSearchText = searchText.trim();
    if (trimmedSearchText) {
      try {


        const response = await fetch(`http://localhost:3000/user/search/categories?keyword=${encodeURIComponent(trimmedSearchText)}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        onResults && onResults(data);
        
      } catch (error) {
        console.error('Error al buscar categorías:', error);
      }
    } else {
      // Si el campo de búsqueda está vacío, muestra todas las categorías
      onClear && onClear();
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
    onClear && onClear();  // Muestra todas las categorías cuando se borra la búsqueda
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

    </div>
  );
}

BannerSearch.propTypes = {
  onResults: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired, // Añade onClear como requerido
};

export default BannerSearch;
