// src/controllers/categoryController.js

import { getAllCategories } from '../services/categoryService.js';

export const fetchCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};
