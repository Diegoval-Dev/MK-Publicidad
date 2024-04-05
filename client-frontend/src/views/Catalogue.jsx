import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
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
      <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
        <Banner />
        <div className='container flex space-x-4 justify-between'>
        <button onClick={goToHomePage} className="py-2 px-4 bg-lime-500 text-black rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <button onClick={toggleFilterVisibility} className="py-2 px-4 bg-lime-500 text-black rounded">
          {isFilterVisible ? "" : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            }
        </button>
        </div>
        {isFilterVisible && (
          <Filter 
            toggleFilterVisibility={toggleFilterVisibility} 
            tempFilters={tempFilters}
            setTempFilters={setTempFilters} 
            handleApplyFilters={handleApplyFilters}
            handleClearFilters={handleClearFilters}
          />)}
        <ProductList category={"A"} material={appliedFilters.material} technique={appliedFilters.technique} size={appliedFilters.size} color={appliedFilters.color} />
      </div>
    )
}

export default Catalogue;