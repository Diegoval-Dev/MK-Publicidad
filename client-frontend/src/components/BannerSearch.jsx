import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function BannerSearch() {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  const handleSubmit = (e) => {
    // Deja que el formulario se envíe normalmente
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Buscar..." 
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
      </form>
    </div>
  );
}

export default BannerSearch;