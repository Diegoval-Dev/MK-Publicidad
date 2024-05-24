import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/products', productController.getAllProducts);

// Ruta para obtener los filtros posibles por categoria
router.get('/filters/:category', productController.getFilterOptionsByCategory);

/**
 * @swagger
 * /products/categories:
 *   get:
 *     summary: Obtiene todas las categorías con una imagen representativa
 *     responses:
 *       200:
 *         description: Lista de categorías con imágenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   image:
 *                     type: string
 */
router.get('/categories', productController.getAllCategories);

router.get('/products/:id', productController.getProductById);

//Ruta para endpoint de search bar de categorias
/**
 * @swagger
 * /products/search/categories:
 *   get:
 *     summary: Busca categorías por palabra clave
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: Palabra clave para buscar categorías
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   image:
 *                     type: string
 */
router.get('/search/categories', productController.getCategoriesByKeyword);

export default router;
