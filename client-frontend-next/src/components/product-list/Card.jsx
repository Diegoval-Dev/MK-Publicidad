import PropTypes from 'prop-types';

import '@styles/product-list/Card.css';

function Card({ nombre_producto, codigo_producto, material, description, url_imagen }) {
  return (
    <div className="card-container border p-4">
      <img className="w-full h-auto object-contain" src={url_imagen} alt={nombre_producto} />
      <h2 className="card-title break-words">{nombre_producto}</h2>
      <p className="card-codigo_producto text-color-text">{codigo_producto}</p>
      {/* <p className="card-material">Material: {material}</p> */}
      <p className="card-description">{description}</p>
    </div>
  );
}

Card.propTypes = {
  nombre_producto: PropTypes.string.isRequired,
  codigo_producto: PropTypes.string,
  material: PropTypes.string,
  description: PropTypes.string,
  url_imagen: PropTypes.string.isRequired,
};

export default Card;
