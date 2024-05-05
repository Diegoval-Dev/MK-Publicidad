import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import useNavigate from '@hooks/useNavigate';
import Card from './Card';

function ProductList({category, material, technique, size, color }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { navigate, params } = useNavigate();

  useEffect(() => {
    const products = [
    {
      "id": "1",
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "id": "2",
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "id": "3",
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "id": "4",
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "id": "5",
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },

    {
      "id": "6",
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },

    {
      "id": "7",
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },

    {
      "id": "8",
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


  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <>
      <h2 className='titleAdmin' style={{alignSelf: "flex-start", fontSize: "25px", margin: "2%"}}>{products[0].category}</h2>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", }}>
        {products.map((product, index) => (
              <div key={index} style={{margin: "1%"}} onClick={() => navigate('/customization', product.id)}>
                  <Card {...product} />
              </div>  
        ))}
      </div>
    </>
  );
}

ProductList.propTypes = {
  onClick: PropTypes.func.isRequired,
  category: PropTypes.string,
  material: PropTypes.array,
  technique: PropTypes.array,
  size: PropTypes.array,
  color: PropTypes.array
}

export default ProductList;