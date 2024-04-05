import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

router.get('/products', productController.getAllProducts);
router.get('/products/byMaterial/:material', productController.getAllProductsByMaterial);
router.get('/products/byName/:name', productController.getAllProductsByName);
router.get('/products/byCategory/:category', productController.getAllProductsByCategory);


export default router;

