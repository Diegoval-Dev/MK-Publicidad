import React, { useEffect, useState } from 'react';
import FilterDrop from './Filterdropdown'

function Filter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: [],
    material: [],
    technique: [],
    size: [],
    color: [],
  });

  const [tempFilters, setTempFilters] = useState(filters);
  
  const handlerAppliyFilters = () => {
    setFilters(tempFilters);
  }

  useEffect(()=>{
    console.log(filters)

    //Aquí se hace la solicitud
  }, [filters])

  

  const handleClearFilters = () => {
    const initialFilters = {
      category: [],
      material: [],
      technique: [],
      size: [],
      color: [],
    };
    setFilters(initialFilters);
    setTempFilters(initialFilters);
  };


  return (
    <div className="w-1/3 h-full fixed top-0 right-0 bg-white shadow-md p-5 overflow-auto">
      <div className="mb-7">
        <h3 className="m-0 text-lg font-bold text-center">Filtrar</h3>
        <button className="border-none bg-none cursor-pointer text-3xl absolute top-1 right-1">×</button>
      </div>
      <hr className="my-5" />
      <div className="mb-10">
        <div className="flex justify-between mb-5">
          <span className="font-bold">Ordenar por:</span>
          <select name="order" className="w-3/5 p-1 rounded border border-gray-300">
            <option value="novedades">Novedades</option>
            <option value="precio">Precio</option>
            <option value="nuevo">Nuevo</option>
          </select>
        </div>
      </div>
      <hr className="my-5" />
      <FilterDrop 
        namefilter='Material' 
        optionsfilter={["Plástico", "Metal", "Aluminio"]}
        selectedOptions={tempFilters.material}
        onChange={(newMaterialFilters) => {
          setTempFilters(temp => {
            const updatedFilters = {...temp, material: newMaterialFilters};
            return updatedFilters;
          });
        }}
        >
      </FilterDrop>
      <hr className="my-5" />
      <FilterDrop 
        namefilter='Técnica' 
        optionsfilter={["Sublimado", "Impreso", "Bordado"]}
        selectedOptions={tempFilters.technique}
        onChange={(newTechniqueFilters) => {
          setTempFilters(temp => {
            const updatedFilters = {...temp, technique: newTechniqueFilters};
            return updatedFilters;
          });
        }}
        >
      </FilterDrop>
      <hr className="my-5" />
      <FilterDrop 
        namefilter='Talla' 
        optionsfilter={["XS","S","M","L","XXL"]}
        selectedOptions={tempFilters.size}
        onChange={(newSizeFilters) => {
          setTempFilters(temp => {
            const updatedFilters = {...temp, size: newSizeFilters};
            return updatedFilters;
          });
        }}
        >
      </FilterDrop>
      <hr className="my-5" />
      <FilterDrop 
        namefilter='Color' 
        optionsfilter={["Blanco", "Negro", "Azul", "Morada", "Roja"]}
        selectedOptions={tempFilters.color}
        onChange={(newColorFilters) => {
          setTempFilters(temp => {
            const updatedFilters = {...temp, color: newColorFilters};
            return updatedFilters;
          });
        }}
        >
      </FilterDrop>
      <div className="flex justify-between">
        <button onClick={handleClearFilters} className="py-2 px-5 rounded bg-[#f9f5eb] text-black border-none">Limpiar</button>
        <button onClick={handlerAppliyFilters} className="py-2 px-5 rounded bg-black text-white border-none">Ver Resultados</button>
      </div>
    </div>
  );
}

export default Filter;