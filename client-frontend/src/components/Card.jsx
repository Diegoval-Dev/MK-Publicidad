import PropTypes from 'prop-types';

function Card({ id_producto, nombre_producto, codigo_producto, material, description, url_imagen }) {
  return (
    <div className="card-container">
      <img className="card-url_imagen" src={url_imagen} alt={nombre_producto} />
      <h2 className="card-title">{nombre_producto}</h2>
      <p className="card-codigo_producto">{codigo_producto}</p>
      <p className="card-material">Material: {material}</p>
      <p className="card-description">{description}</p>
    </div>
  );
}

Card.propTypes = {
  productId: PropTypes.string,
  name: PropTypes.string,
  codigo_producto: PropTypes.string,
  material: PropTypes.string,
  description: PropTypes.string,
  url_imagen: PropTypes.string.isRequired,
};

export default Card;
