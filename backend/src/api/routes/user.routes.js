import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

/**
 * @openapi
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

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene los filtros posibles por categoria
 *     responses:
 *       200:
 *         description: Lista de filtros de cada categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
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


/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene un producto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error en el servidor
 */
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
