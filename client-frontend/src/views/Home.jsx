import Banner from '../components/Banner';
import BannerSearch from '../components/BannerSearch'; 
import Footer from '../components/Footer';
import ProductHomeList from '../components/ProducHomeList';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const p = [

    {
      "name": "Sudadero Personalizado11",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-para-Sublimar1.jpg",
      "category": "Sudaderos11"
    },
    {
      "name": "Sudadero Personalizado22",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos22"
    },
    {
      "name": "Sudadero Personalizado 3",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos 3"
    },
    {
      "name": "Sudadero Personalizado 2",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos 2"
    },
    {
      "name": "Sudadero Personalizado 1",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos 1"
    },
  ]

  useEffect(() => {
    setProducts(p)
    setLoading(false)
  }, [])

  // useEffect(() => {
  //   async function loadAllProducts() {
  //     try {
  //         const response = await fetch('http://localhost:3000/user/products')

  //         if (response.ok) {
  //           const data = await response.json()
  //           setProducts(data["data"])
  //           setLoading(false)
  //           console.log("Éxito")
  //           console.log(products)


  //         } else {
  //           throw new Error("No fue posible obtener los productos.")

  //         }

  //     } catch (error) {
  //       console.log("Ocurrió un error al obtener los productos:", error)
  //     }
  //   }

  //   loadAllProducts()
  // }, [])

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



  return (
    <div className="flex flex-col items-center">
      <Banner />
      <BannerSearch />
      <ProductHomeList products={products}/>
      <Footer/>
    </div>
  );
}



export default HomePage