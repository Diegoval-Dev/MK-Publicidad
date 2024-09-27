'use client';

import { useState, useEffect } from 'react';
import BannerSearch from '@components/categories/BannerSearch';
import ProducHomeList from '@components/categories/ProducHomeList';
import { fetchCategories } from '@api/categories';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    loadCategories();
  }, []);


  const handleResults = (results) => {
    setCategories(results);
  };

  const handleClear = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  return (
    <div className=' text-color-text'>
      <BannerSearch onResults={handleResults} onClear={handleClear} />
      <ProducHomeList categories={categories} />
    </div>
  );
}
