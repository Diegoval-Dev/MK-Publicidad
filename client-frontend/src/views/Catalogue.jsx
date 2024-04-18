import PropTypes from 'prop-types';
import { useState } from 'react';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
import NavigationButtons from '../components/NavigationButtons';
import FilterControls from '../components/FilterControls';
import '../styles/styles.css';

function Catalogue({ setScreen }) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [tempFilters, setTempFilters] = useState({
    material: [],
    technique: [],
    size: [],
    color: [],
  });

  const loadAllProducts = () => {
    async function getAllProducts() {
      const apiURL = `http://localhost:3000/user/products`;
      const [products, setProducts] = useState([]);
      
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
              throw new Error("No fue posible obtener los productos.");
              
          };
          
      } catch (error) {
          console.log("Ocurrió un error al obtener los productos:", error);
      };
  
      return products;
    };
  }

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

  const goToHomePage = () => {
    setScreen("home")
  }

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Banner />
      <div className="container flex justify-between w-full">
        <NavigationButtons
          goToHomePage={goToHomePage}
        />
        <FilterControls
          toggleFilterVisibility={toggleFilterVisibility}
          isFilterVisible={isFilterVisible}
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          handleApplyFilters={handleApplyFilters}
          handleClearFilters={handleClearFilters}
        />
      </div>
      <ProductList
        category={"A"}
        material={appliedFilters.material}
        technique={appliedFilters.technique}
        size={appliedFilters.size}
        color={appliedFilters.color}
      />
    </div>
  );
  
}

Catalogue.propTypes = {
  setScreen: PropTypes.func.isRequired,
};

export default Catalogue;