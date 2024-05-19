import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// Ruta unificada para obtener productos con cualquier combinación de filtros
router.get('/products', productController.getAllProducts);

// Ruta para obtener los filtros posibles por categoria
router.get('/filters/:category', productController.getFilterOptionsByCategory);
router.get('/categories', productController.getAllCategories);

router.get('/products/:id', productController.getProductById);

export default router;
