import PropTypes from 'prop-types';
import Banner from '../components/Banner';
import BannerSearch from '../components/BannerSearch'; 
import Footer from '../components/Footer';
import ProductHomeList from '../components/ProducHomeList';

function HomePage({ setScreen }) {

  // Objeto de Prueba
  const products = [
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-para-Sublimar1.jpg",
      "category": "Sudaderos"
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://printto.com.gt/wp-content/uploads/2022/06/impresion-digital-lona-manta-vinilica-vinilo-adhesivo-guatemala.jpg",
      "category": "Mantas"
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/03/Taza-Asa-Bicolor-Celeste.jpg",
      "category": "Tazas Personalizadas"
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/03/Pachon-Blanco-Tapon-Negro.jpg",
      "category": "Pachones Personalizados"
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://printto.com.gt/wp-content/uploads/2022/06/impresion-digital-lona-manta-vinilica-vinilo-adhesivo-guatemala.jpg",
      "category": "Mantas"
    },
  ]


  const goToCatalog = () => {
    setScreen("catalog")
  }

  return (
    <div className="flex flex-col items-center">
      <Banner />
      <BannerSearch />
      <ProductHomeList products={products} goToCatalog={goToCatalog}/>
      <Footer/>
    </div>
  );
}

HomePage.propTypes = {
  setScreen: PropTypes.func.isRequired,
};

export default HomePage