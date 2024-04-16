import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
import NavigationButtons from '../components/NavigationButtons';
import Filter from '../components/Filter';
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

  const goToHomePage = () => {
    setScreen("home")
  }

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Banner />
      <NavigationButtons
        goToHomePage={goToHomePage}
        toggleFilterVisibility={toggleFilterVisibility}
        isFilterVisible={isFilterVisible}
      />
      {isFilterVisible && (
        <Filter
          toggleFilterVisibility={toggleFilterVisibility}
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          handleApplyFilters={handleApplyFilters}
          handleClearFilters={handleClearFilters}
        />
      )}
      <ProductList
        category={"A"}
        material={appliedFilters.material}
        technique={appliedFilters.technique}
        size={appliedFilters.size}
        color={appliedFilters.color}
      />
    </div>
  )
}

export default Catalogue;