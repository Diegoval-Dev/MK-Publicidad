import { render, screen } from '@testing-library/react';
import Card from '../components/Card';
import '@testing-library/jest-dom';

describe('Card', () => {
  const cardProps = {
    nombre_producto: 'Producto de prueba',
    codigo_producto: '1',
    material: 'Algodón',
    description: 'Descripción de prueba',
    url_imagen: 'https://via.placeholder.com/150',
  };

  it('renders the card component with the provided props', () => {
    render(<Card { ...cardProps } />);

    const imgElement = screen.getByAltText(cardProps.nombre_producto);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', cardProps.url_imagen);

    const titleElement = screen.getByText(cardProps.nombre_producto);
    expect(titleElement).toBeInTheDocument();

    const materialElement = screen.getByText(`Material: ${cardProps.material}`);
    expect(materialElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(cardProps.description);
    expect(descriptionElement).toBeInTheDocument();
  });
});