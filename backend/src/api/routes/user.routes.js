import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

router.get('/products', productController.getAllProducts);
router.get('/products/:material', productController.getAllProductsByMaterial);


export default router;

