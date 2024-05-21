import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function Filter({ toggleFilterVisibility, setTempFilters, tempFilters, handleApplyFilters, handleClearFilters }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/categories');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Fetched categories:', data); // For debugging
      const categoryNames = data.map(item => item.category);
      setCategories(categoryNames);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChangeFilter = (filterName) => (newValue) => {
    setTempFilters((currentFilters) => ({
      ...currentFilters,
      [filterName]: newValue,
    }));
  };

  return (
    <div className="w-1/3 h-full fixed top-0 right-0 bg-white shadow-md p-5 overflow-auto">
      <div className="mb-7">
        <h3 className="m-0 text-lg font-bold text-center">Filtrar</h3>
        <button onClick={toggleFilterVisibility} className="text-3xl absolute top-1 right-1 pr-3" aria-label="Cerrar">×</button>
      </div>
      <div className="mb-5">
        <label htmlFor="category">Categoría:</label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      {selectedCategory && (
        <>
          <hr className="my-5" />
          {/* */}
          <div className="flex justify-between mt-5">
            <button onClick={handleClearFilters} className="py-2 px-5 rounded bg-[#f9f5eb] text-black border-none">Limpiar</button>
            <button onClick={handleApplyFilters} className="py-2 px-5 rounded bg-black text-white border-none">Ver Resultados</button>
          </div>
        </>
      )}
    </div>
  );
}

Filter.propTypes = {
  toggleFilterVisibility: PropTypes.func.isRequired,
  setTempFilters: PropTypes.func.isRequired,
  tempFilters: PropTypes.object.isRequired,
  handleApplyFilters: PropTypes.func.isRequired,
  handleClearFilters: PropTypes.func.isRequired,
};

export default Filter;
