import PropTypes from 'prop-types';
import ProductCategory from './ProductCategory';
import useNavigate from '@hooks/useNavigate';

function ProducHomeList({ products = [], categories = [] }) {
  const { navigate } = useNavigate();

  return (
    <div className="container mx-auto border border-black-300 p-4 mt-5 shadow-md rounded-lg">
      <div className="flex flex-wrap justify-center">
        {categories.length === 0 ? (
          <p>No hay categorías disponibles</p>
        ) : (
          categories.map((category, index) => {
            const productImage = products.find(product => product.category === category.category);
            return (
              <div key={index} onClick={() => navigate('catalogue', {category: category.category})} className="cursor-pointer w-64 mx-4 my-4">
                <ProductCategory
                  image={category.image}
                  category={category.category}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

ProducHomeList.propTypes = {
  products: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired
};

export default ProducHomeList;
