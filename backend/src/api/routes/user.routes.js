import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// Ruta unificada para obtener productos con cualquier combinación de filtros
router.get('/products', productController.getAllProducts);

export default router;
