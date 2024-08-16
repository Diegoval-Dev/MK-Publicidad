import PropTypes from 'prop-types';
import { useNavigate } from '@hooks/useNavigate';
import Card from './Card';
import '../styles/styles.css'; 

function ProductList({ products }) {
  const { navigate } = useNavigate();

  if (products.length === 0) {
    return <p>No se encontraron productos para los filtros aplicados.</p>;
  }

  return (
    <>
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="circle circle-4"></div> 
      <div className="circle circle-5"></div> 
      <div className="product-list-container">
        {products.map((product, index) => (
          <div key={index} onClick={() => navigate('customization', { productId: product.id })}>
            <Card {...product} />
          </div>
        ))}
      </div>
    </>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
