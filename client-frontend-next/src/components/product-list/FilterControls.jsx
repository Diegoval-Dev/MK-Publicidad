import PropTypes from 'prop-types';
import Filter from './Filter';

function FilterControls({ toggleFilterVisibility, isFilterVisible, tempFilters, setTempFilters, handleApplyFilters, handleClearFilters, selectedCategory }) {
  return (
    <div className="">
      <button onClick={toggleFilterVisibility} className="py-2 px-4 bg-lime-500 text-black rounded">
        {isFilterVisible ? "" : 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
        }
      </button>

      {isFilterVisible && (
        <Filter            
          toggleFilterVisibility={toggleFilterVisibility}
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          handleApplyFilters={handleApplyFilters}
          handleClearFilters={handleClearFilters}
          selectedCategory={selectedCategory} // Pasamos selectedCategory aquí
        />
      )}
    </div>
  );
}

FilterControls.propTypes = {
  toggleFilterVisibility: PropTypes.func.isRequired,
  isFilterVisible: PropTypes.bool.isRequired,
  tempFilters: PropTypes.object.isRequired,
  setTempFilters: PropTypes.func.isRequired,
  handleApplyFilters: PropTypes.func.isRequired,
  handleClearFilters: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired, // Añadimos selectedCategory aquí
};

export default FilterControls;
