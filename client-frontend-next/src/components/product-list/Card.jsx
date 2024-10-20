import PropTypes from 'prop-types';

import '@styles/product-list/Card.css';

function Card({ product_name, product_code, material, image_url, capacity, size, Colors }) {
  return (
    <div className="card-container border p-4">
      <div className="w-full h-48 bg-transparent flex justify-center items-center">
        <img className="w-full h-full object-contain" src={image_url} alt={product_name} />
      </div>
      <h2 className="card-title break-words mt-4">{product_name}</h2>
      <p className="card-codigo_producto text-color-text">{product_code}</p>
      {capacity && <p className="card-capacity">Capacidad: {capacity}</p>}
      {size && <p className="card-size">Tamaño: {size}</p>}
      {Colors && (
        <div className="card-colors mt-4">
          <p>Colores:</p>
          <ul className="flex space-x-2">
            {Colors.map((color) => (
              <li
                key={color.color_name}
                className="w-6 h-6 rounded-full border-2 border-black"  
                style={{ backgroundColor: color.hex_code }}
                title={color.color_name}
              />
            ))}
          </ul>
        </div>
      )}
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
