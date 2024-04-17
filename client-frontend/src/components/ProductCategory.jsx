import PropTypes from 'prop-types';

function ProductCategory({image, category}){
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={image}
          alt="Imagen de Categoría"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <p className="text-lg font-semibold">{category}</p>
        </div>
      </div>
    )
}

ProductCategory.propTypes = {
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
}

export default ProductCategory;