import PropTypes, { array, func } from 'prop-types';
import Banner from '../components/Banner';
import BannerSearch from '../components/BannerSearch'; 
import Footer from '../components/Footer';
import ProductHomeList from '../components/ProducHomeList';
import { useEffect, useState } from 'react';

function HomePage({ setScreen }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAllProducts() {
      try {
          const response = await fetch('http://localhost:3000/user/products')

          if (response.ok) {
            const data = await response.json()
            setProducts(Array.from(data))
            setLoading(false)
            console.log("Éxito")
            console.log(products)


          } else {
            throw new Error("No fue posible obtener los productos.")

          }

      } catch (error) {
        console.log("Ocurrió un error al obtener los productos:", error)
      }
    }

    loadAllProducts()
  }, [])

  if (loading) {
    return(
      <div className="flex flex-col items-center">
        <Banner />
        <BannerSearch />
        <p>Loading...</p>
        <Footer/>
      </div>
    )
  }

  const goToCatalog = () => {
    setScreen(
      {name: "catalog", data: null}
    )
  }

  return (
    <div className="flex flex-col items-center">
      <Banner />
      <BannerSearch />
      <ProductHomeList products={products} goToCatalog={goToCatalogue}/>
      <Footer/>
    </div>
  );
}

HomePage.propTypes = {
  setScreen: PropTypes.func.isRequired,
};

export default HomePage