import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import BannerSearch from '../components/BannerSearch';
import Footer from '../components/Footer';
import ProducHomeList from '../components/ProducHomeList';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const apiURL = 'http://localhost:3000/user/categories';
    try {
      const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Datos de categorías:", data);
        setCategories(data); 
      } else {
        console.error("Error al obtener categorías:", response.statusText);
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = (categories) => {
    setCategories(categories);
  };

  const handleClearResults = () => {
    loadCategories();  // Carga todas las categorías si la búsqueda es vacía
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <Banner />
        <BannerSearch onResults={handleSearchResults} onClear={handleClearResults} />
        <p>Loading...</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Banner />
      <BannerSearch onResults={handleSearchResults} onClear={handleClearResults} />
      <ProducHomeList products={products} categories={categories} />
      <Footer />
    </div>
  );
}

export default HomePage;
