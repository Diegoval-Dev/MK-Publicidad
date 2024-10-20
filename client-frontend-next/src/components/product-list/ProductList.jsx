'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from './Card';
import { fetchProductsByCategory } from '@api/products';

function ProductList({ category, products }) {
  const router = useRouter();

  return (
    <>
      <h2 className="centered-title text-color-text">{category}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.product_id}
            onClick={() =>
              router.push(
                `/categorias/${encodeURIComponent(category)}/${product.product_id}`
              )
            }
            className="cursor-pointer"
          >
            <Card {...product} />
          </div>
        ))}
      </div>
    </>
  );
}

ProductList.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ProductList;
