import PropTypes from 'prop-types';
import ProductCategory from './ProductCategory';
import Link from 'next/link';

function ProducHomeList({ categories = [] }) {
  return (
    <div className="container mx-auto border border-black-300 p-4 mt-5 shadow-md rounded-lg">
      <div className="flex flex-wrap justify-center">
        {categories.length === 0 ? (
          <p>No hay categorías disponibles</p>
        ) : (
          categories.map((category, index) => (
            <div key={index} className="cursor-pointer w-64 mx-4 my-4">
              <Link href={`categorias/${encodeURIComponent(category.category_name)}`}>
                  <ProductCategory
                    image={category.image_url	|| ''}
                    category={category.category_name}
                  />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

ProducHomeList.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default ProducHomeList;
