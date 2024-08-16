import PropTypes from 'prop-types';
import { useNavigate } from '@hooks/useNavigate';
import Card from './Card';
import '../styles/styles.css'; 

function ProductList({ products, appliedFilters }) {
  const { navigate } = useNavigate();

  const noProductsFound = products.length === 0 && Object.values(appliedFilters).some(filter => filter.length > 0);

  return (
    <>
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="circle circle-4"></div> 
      <div className="circle circle-5"></div> 

      {noProductsFound ? (
        <p>No se encontraron productos para los filtros aplicados.</p>
      ) : (
        <div className="product-list-container">
          {products.map((product, index) => (
            <div key={index} onClick={() => navigate('customization', { productId: product.id })}>
              <Card {...product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  appliedFilters: PropTypes.object.isRequired,  // Añadimos appliedFilters como prop
};

export default ProductList;
