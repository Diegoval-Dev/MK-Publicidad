import PropTypes from 'prop-types';

function ProductCategory({ image, category }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 p-3">
      <div className="w-full h-48 bg-transparent flex justify-center items-center">
        <img
          src={image}
          alt="Imagen de Categoría"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold text-center">{category}</p>
      </div>
    </div>
  );
}

ProductCategory.propTypes = {
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
}

export default ProductCategory;
