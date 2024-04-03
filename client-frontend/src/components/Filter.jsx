import React, { useState } from 'react';
import FilterDrop from './Filterdropdown'

function Filter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    material: '',
    technique: '',
    size: '',
    color: '',
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      material: '',
      technique: '',
      size: '',
      color: '',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('Search Term:', searchTerm);
    console.log('Filters:', filters);
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
      <FilterDrop namefilter='Material' optionsfilter={["Plástico", "Metal", "Aluminio"]}></FilterDrop>
      <hr className="my-5" />
      <FilterDrop namefilter='Técnica' optionsfilter={["Sublimado", "Impreso", "Bordado"]}></FilterDrop>
      <hr className="my-5" />
      <FilterDrop namefilter='Talla' optionsfilter={["XS","S","M","L","XXL"]}></FilterDrop>
      <hr className="my-5" />
      <FilterDrop namefilter='Color' optionsfilter={["Blanco", "Negro", "Azul", "Morada", "Roja"]}></FilterDrop>
      <div className="flex justify-between">
        <button onClick={handleClearFilters} className="py-2 px-5 rounded bg-[#f9f5eb] text-black border-none">Limpiar</button>
        <button onClick={handleSubmit} className="py-2 px-5 rounded bg-black text-white border-none">Ver Resultados</button>
      </div>
    </div>
  );
}

export default Filter;