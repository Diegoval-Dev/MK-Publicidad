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
  const [appliedFilters, setAppliedFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [tempFilters, setTempFilters] = useState({
    material: [],
    technique: [],
    size: [],
    color: [],
  });

  console.log(params)

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
        setProducts(Array.from(data));
        console.log("Éxito");
        console.log(products);

      } else {
        throw new Error("Ocurrió un error al obtener los productos.")

      }
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleApplyFilters = () => {
    setAppliedFilters(tempFilters);
    toggleFilterVisibility();
  };

  const handleClearFilters = () => {
    const initialFilters = {
      material: [],
      technique: [],
      size: [],
      color: [],
    };
    setTempFilters(initialFilters);
    setAppliedFilters(initialFilters);
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
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          handleApplyFilters={handleApplyFilters}
          handleClearFilters={handleClearFilters}
          selectedCategory={selectedCategory} // Pasamos selectedCategory aquí
        />
      </div>
      <ProductList
        category={selectedCategory}
        material={appliedFilters.material}
        technique={appliedFilters.technique}
        size={appliedFilters.size}
        color={appliedFilters.color}
      />
    </div>
  );
}

Catalogue.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategorySelection: PropTypes.func.isRequired,
};

export default Catalogue;
