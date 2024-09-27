'use client'; // Indica que el código es para el cliente

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { searchCategories } from '@api/categories';


function BannerSearch({ onResults, onClear }) {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedSearchText = searchText.trim();
    if (trimmedSearchText) {
      try {
        const data = await searchCategories(trimmedSearchText);
        if (onResults) {
          onResults(data);
        }
      } catch (error) {
        console.error('Error al buscar categorías:', error);
      }
    } else {
      if (onClear) {
        onClear();
      }
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
    if (onClear) {
      onClear();
    }
  };

  const handleContactClick = () => {
    router.push('/contact');
  };
  return (
    <div className='flex items-center justify-center'>
      <form onSubmit={handleSubmit} className="flex items-center justify-center">
        <div className="relative">
          <input
            type="text"
            name="search"
            placeholder="Buscar categoría..."
            value={searchText}
            onChange={handleInputChange}
            className="pl-4 border-b-2 border-black-500 pe-20 py-2 rounded-lg focus:outline-none focus:border-green-500 mx-1 shadow-md text-color-text"
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
        <button className="border border-lime-600 px-4 py-2 rounded-lg ml-1 bg-800 text-white hover:bg-lime-600 cursor-pointer bg-lime-500"  onClick={handleContactClick}>Contáctanos</button>
      </form>


    </div>
  );
}

BannerSearch.propTypes = {
  onResults: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired, 
};

export default BannerSearch;
