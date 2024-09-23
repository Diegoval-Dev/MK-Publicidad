'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; 

import ProductList from '@components/product-list/ProductList';
import NavigationButtons from '@components/utils/NavigationButtons';
import FilterControls from '@components/product-list/FilterControls';
import { fetchProductsByCategory } from '@api/products';

function Catalogue() {
  const { nombre_categoria } = useParams();
  const router = useRouter(); 

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    material: [],
    technique: [],
    size: [],
    color: [],
  });
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (nombre_categoria) {
      loadProductsByCategory(nombre_categoria);
    }
  }, [nombre_categoria]);

  const loadProductsByCategory = async (category) => {
    if (!category) {
      console.error('Category is undefined');
      return;
    }

    try {
      const data = await fetchProductsByCategory(category);
      
      const productArray = Array.isArray(data.data) ? data.data : [];
      setProducts(productArray);
      setFilteredProducts(productArray);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = products;

    if (appliedFilters.material.length > 0) {
      filtered = filtered.filter((product) =>
        appliedFilters.material.includes(product.material)
      );
    }
    if (appliedFilters.technique.length > 0) {
      filtered = filtered.filter((product) =>
        appliedFilters.technique.includes(product.technique)
      );
    }
    if (appliedFilters.size.length > 0) {
      filtered = filtered.filter((product) =>
        appliedFilters.size.includes(product.size)
      );
    }
    if (appliedFilters.color.length > 0) {
      filtered = filtered.filter((product) =>
        appliedFilters.color.includes(product.color)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleApplyFilters = () => {
    applyFilters();
    toggleFilterVisibility();
  };

  const handleClearFilters = () => {
    setAppliedFilters({
      material: [],
      technique: [],
      size: [],
      color: [],
    });
    setFilteredProducts(products);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };



  return (
    <div className="flex flex-col items-center">
      <div className="container flex justify-between w-full p-4">
        <NavigationButtons onClick={() => router.push('/categorias')} />
        <FilterControls
          toggleFilterVisibility={toggleFilterVisibility}
          isFilterVisible={isFilterVisible}
          tempFilters={appliedFilters}
          setTempFilters={setAppliedFilters}
          handleApplyFilters={handleApplyFilters}
          handleClearFilters={handleClearFilters}
          selectedCategory={nombre_categoria}
        />
      </div>
      {loading ? (
        <p className='text-color-text'>Cargando productos...</p>
      ) : filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} category={nombre_categoria} />
      ) : (
        <p className='text-color-text'>No se encontraron productos para la categoría seleccionada.</p>
      )}
    </div>
  );
}

export default Catalogue;
