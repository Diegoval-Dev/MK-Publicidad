// src/services/categoryService.js

import Category from '../../models/categoryModel.js';

export const getAllCategories = async () => {
  try {
    // Devuelve solo category_id y category_name
    return await Category.findAll({
      attributes: ['category_id', 'category_name'],
    });
  } catch (error) {
    throw error;
  }
};
