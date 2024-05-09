import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// Ruta unificada para obtener productos con cualquier combinación de filtros
router.get('/products', productController.getAllProducts);

// Ruta para obtener los filtros posibles por categoria
router.get('/filters/:category', productController.getFilterOptionsByCategory);

export default router;
