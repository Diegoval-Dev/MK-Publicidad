import PropTypes from 'prop-types';

function Card({name, category, material, description, image}) {
  return (
    <div className="w-60 h-96 flex flex-col justify-center items-center gap-1 bg-color-componentes border rounded-3xl border-color-contorno">
        <img className="aspect-auto h-60" src={image} alt={name} />
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm font-semibold text-color-prices self-start ml-4 p-1 border border-color-contornoButtons rounded-3xl">{category}</p>
        <p className="text-sm font-semibold text-color-prices self-start ml-4">Material: {material}</p>
        <p className="text-base text-color-prices">{description}</p>
    </div>
  )
}

Card.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  material: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired
}


export default Card