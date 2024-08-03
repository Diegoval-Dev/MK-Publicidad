import Banner from '../components/Banner';
import BannerSearch from '../components/BannerSearch';
import Footer from '../components/Footer';
import PreviewProduct from '../components/PreviewProduct';
import ProducHomeList from '../components/ProducHomeList';
import { useEffect, useState } from 'react';

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
          return data;
        } else {
          console.error("Error al obtener categorías:", response.statusText);
        }
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      } finally {
        setLoading(false);
      }
  }

  const loadCategoriesSearch = async (keyword = '') => {
    if (keyword == "") {
      loadCategories();
      return;
    }
    const apiURL = `http://localhost:3000/user/search/categories?keyword=${keyword}`;
    try {
      const response = await fetch(apiURL);
      if (response.ok) {
        const data = await response.json();
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

  const handleSearch = (keyword) => {
    setLoading(true);
    loadCategoriesSearch(keyword);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <Banner />
        <BannerSearch onSearch={handleSearch} />
        <p>Loading...</p>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Banner />
      <BannerSearch onSearch={handleSearch} />
      <ProducHomeList products={products} categories={categories} />
      <Footer/>
    </div>
  );
}

export default HomePage;
