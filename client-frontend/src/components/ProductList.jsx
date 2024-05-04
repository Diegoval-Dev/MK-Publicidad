import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Card from './Card';

function ProductList({ setScreen, category, material, technique, size, color }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    
    const products = [
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },

    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },

    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },

    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    ]
    setProducts(products);
    setLoading(false);
  }, []);

  const handleCardClick = (product) => {
    setScreen({
      name: "customization",
      product: product
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <>
      <h2 className='titleAdmin' style={{alignSelf: "flex-start", fontSize: "25px", margin: "2%"}}>{products[0].category}</h2>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", }}>
        {products.map((product, index) => (
              <div key={index} style={{margin: "1%"}} onClick={() => handleCardClick(product)}>
                  <Card {...product} />
              </div>  
        ))}
      </div>
    </>
  );
}

ProductList.propTypes = {
  setScreen: PropTypes.func.isRequired,
  category: PropTypes.string,
  material: PropTypes.array,
  technique: PropTypes.array,
  size: PropTypes.array,
  color: PropTypes.array
}

export default ProductList;