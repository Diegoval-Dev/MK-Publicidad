import PropTypes from 'prop-types';
import ProductCategory from './ProductCategory';
import useNavigate from '@hooks/useNavigate';

function ProducHomeList({ products = [], categories = [] }) {
  console.log("Productos:", products, "Categorías:", categories)
  const { navigate } = useNavigate();

  return (
    <div className="container mx-auto border border-black-300 p-4 mt-5 shadow-md rounded-lg">
      <div className="flex flex-wrap justify-center">
        <button onClick={() => navigate('contact')}>TEST</button>
        {categories.length === 0 ? (
          <p>No hay categorías disponibles</p>
        ) : (
          categories.map((category, index) => {
            const productImage = products.find(product => product.category === category.category);
            return (
              <div
                key={index}
                onClick={() => navigate('catalogue', { category: category.id_categoria })}
                className="cursor-pointer w-64 mx-4 my-4"
              >
                <ProductCategory
                  image={category.url_imagen || 'ruta/a/imagen/predeterminada.jpg'} // Imagen predeterminada si `category.image` es undefined
                  category={category.id_categoria}
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
