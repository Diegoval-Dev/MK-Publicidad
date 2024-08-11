import PropTypes from 'prop-types';
import '../styles/Card.css';

function Card({ productId, name, category, material, description, image }) {
  return (
    <div className="card-container">
      <img className="card-image" src={image} alt={name} />
      <h2 className="card-title">{name}</h2>
      <p className="card-category">{category}</p>
      <p className="card-material">Material: {material}</p>
      <p className="card-description">{description}</p>
    </div>
  );
}

Card.propTypes = {
  productId: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  material: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
};

export default Card;
