import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from '@hooks/useNavigate';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
import NavigationButtons from '../components/NavigationButtons';
import FilterControls from '../components/FilterControls';
import '../styles/styles.css';

function Catalogue({ selectedCategory, onCategorySelection }) {
  const { navigate, params } = useNavigate();

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
    if (params.category) {
      onCategorySelection(params.category);
    }
  }, [params.category, onCategorySelection]);

  useEffect(() => {
    if (selectedCategory) {
      loadProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const loadProductsByCategory = async (category) => {
    setLoading(true);
    const apiURL = `http://localhost:3000/user/products?category=${category}`;
    
    try {
      const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const productArray = Array.isArray(data.data) ? data.data : []; 
        setProducts(productArray);
        setFilteredProducts(productArray);
      } else {
        throw new Error("Ocurrió un error al obtener los productos.");
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = products;

    if (appliedFilters.material.length > 0) {
      filtered = filtered.filter(product => appliedFilters.material.includes(product.material));
    }
    if (appliedFilters.technique.length > 0) {
      filtered = filtered.filter(product => appliedFilters.technique.includes(product.technique));
    }
    if (appliedFilters.size.length > 0) {
      filtered = filtered.filter(product => appliedFilters.size.includes(product.size));
    }
    if (appliedFilters.color.length > 0) {
      filtered = filtered.filter(product => appliedFilters.color.includes(product.color));
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
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Banner />
      <div className="container flex justify-between w-full p-4">
        <NavigationButtons
          onClick={() => navigate('/home')}
        />
        <FilterControls
          toggleFilterVisibility={toggleFilterVisibility}
          isFilterVisible={isFilterVisible}
          tempFilters={appliedFilters}
          setTempFilters={setAppliedFilters}
          handleApplyFilters={handleApplyFilters}
          handleClearFilters={handleClearFilters}
          selectedCategory={selectedCategory}
        />
      </div>
      {!loading && filteredProducts.length > 0 && (
        <ProductList
          products={filteredProducts} 
        />
      )}
      {!loading && filteredProducts.length === 0 && (
        <p>No se encontraron productos para la categoría seleccionada.</p>
      )}
    </div>
  );
}

Catalogue.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategorySelection: PropTypes.func.isRequired,
};

export default Catalogue;
