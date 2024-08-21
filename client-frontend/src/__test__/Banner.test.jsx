import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Banner from '../components/Banner';

describe('Banner', () => {
  test('renders the Banner component', () => {
    render(<Banner />);
    const bannerElement = screen.getByRole('banner');
    expect(bannerElement).toBeInTheDocument();
  });
});
