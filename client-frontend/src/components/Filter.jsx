/*
@Ruth
@Silvia
*/
import React, { useState } from 'react';

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
    <div style={{ width: '30%', height: '100%', position: 'fixed', top: 0, right: 0, backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>Filtrar</h3>
        <button style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '24px', position: 'absolute', top: '5px', right: '5px' }}>×</button>
      </div>
      <hr style={{ margin: '20px 0' }} />
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{ fontWeight: 'bold' }}>Ordenar por:</span>
          <select name="order" style={{ width: '60%', padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }}>
            <option value="novedades">Novedades</option>
            <option value="precio">Precio</option>
            <option value="nuevo">Nuevo</option>
          </select>
        </div>
      </div>


      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}><span style={{ fontWeight: 'bold' }}>Técnica</span><button style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}>+</button></div>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}><span style={{ fontWeight: 'bold' }}>Talla</span><button style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}>+</button></div>
      </div>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}><span style={{ fontWeight: 'bold' }}>Color</span><button style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}>+</button></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleClearFilters} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#f9f5eb', color: '#000', border: 'none' }}>Limpiar</button>
        <button onClick={handleSubmit} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#000', color: '#fff', border: 'none' }}>Ver Resultados</button>
      </div>
    </div>
  );
}

export default Filter;
