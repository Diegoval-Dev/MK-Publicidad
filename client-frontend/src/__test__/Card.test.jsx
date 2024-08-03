import { render, screen } from '@testing-library/react';
import Card from '../components/Card';
import '@testing-library/jest-dom';

describe('Card', () => {
  const cardProps = {
    productId: '1',
    name: 'Producto de prueba',
    category: 'Categoría de prueba',
    material: 'Algodón',
    description: 'Descripción de prueba',
    image: 'https://via.placeholder.com/150',
  };

  it('renders the card component with the provided props', () => {
    render(<Card {...cardProps} />);

    const imgElement = screen.getByAltText(cardProps.name);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', cardProps.image);

    const titleElement = screen.getByText(cardProps.name);
    expect(titleElement).toBeInTheDocument();

    const categoryElement = screen.getByText(cardProps.category);
    expect(categoryElement).toBeInTheDocument();

    const materialElement = screen.getByText(`Material: ${cardProps.material}`);
    expect(materialElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(cardProps.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the card component without optional props', () => {
    const cardPropsWithoutOptional = {
      image: 'https://via.placeholder.com/150',
    };
    
    render(<Card {...cardPropsWithoutOptional} />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', cardPropsWithoutOptional.image);
  });
});
