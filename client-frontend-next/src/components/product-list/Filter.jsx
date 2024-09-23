import '@styles/product-list/Filter.css'; 
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import FilterDrop from './Filterdropdown';

function Filter({ toggleFilterVisibility, setTempFilters, tempFilters, handleApplyFilters, handleClearFilters, selectedCategory }) {
  const [filterOptions, setFilterOptions] = useState({
    material: [],
    technique: [],
    size: [],
    color: []
  });

  useEffect(() => {
    if (selectedCategory) {
      fetchFilters(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchFilters = async (category) => {
    try {
      const response = await fetch(`http://localhost:3000/user/filters/${category}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Fetched filters:', data); // For debugging
      setFilterOptions({
        material: data.materials.filter(item => item !== null && item !== ''),
        technique: data.techniques.filter(item => item !== null && item !== ''),
        size: data.sizes.filter(item => item !== null && item !== ''),
        color: data.colors.filter(item => item !== null && item !== '')
      });
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const handleChangeFilter = (filterName) => (newValue) => {
    setTempFilters((currentFilters) => ({
      ...currentFilters,
      [filterName]: newValue,
    }));
  };

  return (
    <div className="filter-container">
      <div className="mb-7">
        <h3 className="m-0 text-lg font-bold text-center">Filtrar</h3>
        <button onClick={toggleFilterVisibility} className="text-3xl absolute top-1 right-1 pr-3" aria-label="Cerrar">×</button>
      </div>
      {selectedCategory && (
        <>
          <h4 className="mb-3">Categoría: {selectedCategory}</h4>
          <hr className="my-5" />
          {filterOptions.material.length > 0 && (
            <FilterDrop
              namefilter='Material'
              optionsfilter={filterOptions.material}
              selectedOptions={tempFilters.material}
              onChange={handleChangeFilter('material')}
            />
          )}
          {filterOptions.technique.length > 0 && (
            <>
              <hr className="my-5" />
              <FilterDrop
                namefilter='Técnica'
                optionsfilter={filterOptions.technique}
                selectedOptions={tempFilters.technique}
                onChange={handleChangeFilter('technique')}
              />
            </>
          )}
          {filterOptions.size.length > 0 && (
            <>
              <hr className="my-5" />
              <FilterDrop
                namefilter='Talla'
                optionsfilter={filterOptions.size}
                selectedOptions={tempFilters.size}
                onChange={handleChangeFilter('size')}
              />
            </>
          )}
          {filterOptions.color.length > 0 && (
            <>
              <hr className="my-5" />
              <FilterDrop
                namefilter='Color'
                optionsfilter={filterOptions.color}
                selectedOptions={tempFilters.color}
                onChange={handleChangeFilter('color')}
              />
            </>
          )}
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
  selectedCategory: PropTypes.string.isRequired,
};

export default Filter;
