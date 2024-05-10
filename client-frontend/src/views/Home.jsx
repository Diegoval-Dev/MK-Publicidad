import Banner from '../components/Banner';
import BannerSearch from '../components/BannerSearch';
import Footer from '../components/Footer';
import ProducHomeList from '../components/ProducHomeList'; 
import { useEffect, useState } from 'react';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ejemplo de productos simulados
    const p = [
      {
        "name": "Sudadero Personalizado11",
        "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-para-Sublimar1.jpg",
        "category": "Sudaderos11"
      }
    ];

    setProducts(p);

    // Función para cargar categorías desde el endpoint
    async function loadCategories() {
      const apiURL = 'http://localhost:3000/user/categories'; 
      try {
        const response = await fetch(apiURL);
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
    }

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <Banner />
        <BannerSearch />
        <p>Loading...</p>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Banner />
      <BannerSearch />
      <ProducHomeList products={products} categories={categories} />
      <Footer/>
    </div>
  );
}

export default HomePage;
