import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// Ruta unificada para obtener productos con cualquier combinación de filtros
router.get('/products', productController.getAllProducts);

// Ruta para obtener los filtros posibles por categoria
router.get('/filters/:category', productController.getFilterOptionsByCategory);
router.get('/categories', productController.getAllCategories);
//Ruta para endpoint de search bar de categorias
router.get('/search/categories', productController.getCategoriesByKeyword);

export default router;
