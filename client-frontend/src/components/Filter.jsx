import PropTypes from 'prop-types';
import FilterDrop from './Filterdropdown'

function Filter({toggleFilterVisibility, setTempFilters, tempFilters, handleApplyFilters, handleClearFilters}) {
  
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
      {/* <hr className="my-5" />
      <div className="mb-10">
        <div className="flex justify-between mb-5">
          <span className="font-bold">Ordenar por:</span>
          <select name="order" className="w-3/5 p-1 rounded border border-gray-300">
            <option value="novedades">Novedades</option>
            <option value="precio">Precio</option>
            <option value="nuevo">Nuevo</option>
          </select>
        </div>
      </div> */}
      <hr className="my-5" />
      <FilterDrop 
        namefilter='Material' 
        optionsfilter={["Plástico", "Metal", "Aluminio"]}
        selectedOptions={tempFilters.material}
        onChange={handleChangeFilter('material')}
        >
      </FilterDrop>
      <hr className="my-5" />
      <FilterDrop 
        namefilter='Técnica' 
        optionsfilter={["Sublimado", "Impreso", "Bordado"]}
        selectedOptions={tempFilters.technique}
        onChange={handleChangeFilter('technique')}
        >
      </FilterDrop>
      <hr className="my-5" />
      <FilterDrop 
        namefilter='Talla' 
        optionsfilter={["XS","S","M","L","XXL"]}
        selectedOptions={tempFilters.size}
        onChange={handleChangeFilter('size')}
        >
      </FilterDrop>
      <hr className="my-5" />
      <FilterDrop 
        namefilter='Color' 
        optionsfilter={["Blanco", "Negro", "Azul", "Morada", "Roja"]}
        selectedOptions={tempFilters.color}
        onChange={handleChangeFilter('color')}
        >
      </FilterDrop>
      <div className="flex justify-between">
        <button onClick={handleClearFilters} className="py-2 px-5 rounded bg-[#f9f5eb] text-black border-none">Limpiar</button>
        <button onClick={handleApplyFilters} className="py-2 px-5 rounded bg-black text-white border-none">Ver Resultados</button>
      </div>
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