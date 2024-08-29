import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import useNavigate from '@hooks/useNavigate';
import Card from './Card';
import '../styles/styles.css'; 

function ProductList({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigate();

  useEffect(() => {
    async function loadProducts(category) {
      if (!category) {
        console.error('Category is undefined');
        return;
      }

      const apiURL = `http://localhost:3000/user/products?categoria=${category}`;
      try {
        const response = await fetch(apiURL);
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
  }, [category]); // Aquí solo dependemos de 'category'

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
      <h2 className='centered-title'>{category}</h2>
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
  category: PropTypes.string.isRequired,
};

export default ProductList;