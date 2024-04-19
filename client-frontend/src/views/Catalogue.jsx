import PropTypes from 'prop-types';
import { useState } from 'react';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
import NavigationButtons from '../components/NavigationButtons';
import FilterControls from '../components/FilterControls';
import '../styles/styles.css'


function Catalogue({ setScreen }) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [tempFilters, setTempFilters] = useState({
    material: [],
    technique: [],
    size: [],
    color: [],
  });

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
          destination="home"
          setScreen={setScreen}
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
        setScreen={setScreen}
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