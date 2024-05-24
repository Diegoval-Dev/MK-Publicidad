import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import useNavigate from '@hooks/useNavigate';
import Card from './Card';
import '../styles/styles.css'; // Asegúrate de importar el CSS

function ProductList({ category, material, technique, size, color }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { navigate, params } = useNavigate();

  useEffect(() => {
    console.log(params.category);
    async function loadProducts(category) {
      const apiURL = `http://localhost:3000/user/products?category=${category}`;
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
    loadProducts(params.category);
    setLoading(false);
  }, [params.category]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2 className='centered-title'>{params.category}</h2>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
        {products.map((product, index) => (
          <div key={index} style={{ margin: "1%" }} onClick={() => navigate('customization', { productId: product.id })}>
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
