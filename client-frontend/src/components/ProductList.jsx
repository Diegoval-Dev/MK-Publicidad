import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import useNavigate from '@hooks/useNavigate';
import Card from './Card';
import '../styles/styles.css'; 

function ProductList({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { navigate, params } = useNavigate();

  useEffect(() => {
    console.log(params)
    async function loadProducts(category) {
      const apiURL = `http://localhost:3000/user/products?id_categoria=${category}`;
      try {
        const response = await fetch(apiURL);
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.data);
          
        } else {
          throw new Error("No fue posible obtener los productos.");
        }
      } catch (error) {
        console.log("Ocurrió un error al obtener los productos:", error);
      }
    }
    loadProducts(category);
    setLoading(false);
  }, [params.category, category]);

  useEffect(() => {
    console.log("DATA:", products)
  }, [products])

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="circle circle-4"></div> 
      <div className="circle circle-5"></div> 
      <h2 className='centered-title'>{params.category}</h2>
      <div className="product-list-container">
        {products.map((product, index) => (
          <div key={index} onClick={() => navigate('customization', { productId: product.id_producto })}>
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
  color: PropTypes.array,
};

export default ProductList;