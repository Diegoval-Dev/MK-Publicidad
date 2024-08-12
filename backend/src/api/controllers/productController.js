import productService from '../services/productService.js';

/**
 * @openapi
 * /api/admin/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Crea un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_producto:
 *                 type: string
 *               id_categoria:
 *                 type: integer
 *               capacidad:
 *                 type: string
 *               tamaño:
 *                 type: string
 *               url_imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error en el servidor
 */
const createProduct = async (req, res) => {
    try {
        const { nombre_producto, id_categoria, capacidad, tamaño } = req.body;

        // Verifica si hay un archivo de imagen cargado
        let url_imagen = null;
        if (req.file) {
            url_imagen = req.file.path;
        }

        const product = { nombre_producto, id_categoria, capacidad, tamaño, url_imagen };

        const newProduct = await productService.createProduct(product);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene todos los productos con filtros opcionales
 *     parameters:
 *       - in: query
 *         name: nombre_producto
 *         schema:
 *           type: string
 *         description: Nombre del producto
 *       - in: query
 *         name: id_categoria
 *         schema:
 *           type: integer
 *         description: ID de la categoría del producto
 *       - in: query
 *         name: capacidad
 *         schema:
 *           type: string
 *         description: Capacidad del producto
 *       - in: query
 *         name: tamaño
 *         schema:
 *           type: string
 *         description: Tamaño del producto
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error en el servidor
 */
const getAllProducts = async (req, res) => {
    try {
        const { nombre_producto, id_categoria, capacidad, tamaño } = req.query;
        const filters = { nombre_producto, id_categoria, capacidad, tamaño };
        const products = await productService.getProducts(filters);
        res.status(200).json({
            status: 'OK',
            data: products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productService.getProductById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @openapi
 * /api/admin/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Actualiza un producto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre_producto, id_categoria, capacidad, tamaño, url_imagen } = req.body;
        const updatedProduct = await productService.updateProduct(id, { nombre_producto, id_categoria, capacidad, tamaño, url_imagen });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @openapi
 * /api/admin/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Elimina un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productService.deleteProduct(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @openapi
 * /api/products/filter-options/{category}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene las opciones de filtrado para una categoría específica
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Opciones de filtrado obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 capacidades:
 *                   type: array
 *                   items:
 *                     type: string
 *                 tamaños:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Error en el servidor
 */
const getFilterOptionsByCategory = async (req, res) => {
    try {
        const id_categoria = req.params.id_categoria;
        const filters = await productService.getFilterOptionsByCategory(id_categoria);

        res.status(200).json(filters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @openapi
 * /api/products/categories:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene todas las categorías disponibles
 *     responses:
 *       200:
 *         description: Categorías obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_categoria:
 *                     type: integer
 *                   url_imagen:
 *                     type: string
 *       500:
 *         description: Error en el servidor
 */
const getAllCategories = async (req, res) => {
    try {
        const categories = await productService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @openapi
 * /api/products/categories/search:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene categorías de productos que coinciden con una palabra clave
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: false
 *         description: Palabra clave para buscar categorías
 *         example: "camisetas"
 *     responses:
 *       200:
 *         description: Categorías encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_categoria:
 *                     type: integer
 *                   url_imagen:
 *                     type: string
 *       500:
 *         description: Error en el servidor
 */
const getCategoriesByKeyword = async (req, res) => {
    try {
        const keyword = req.query.keyword || ''; // Toma la palabra clave desde los parámetros de consulta
        const categories = await productService.getCategoriesByKeyword(keyword);

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getFilterOptionsByCategory,
    getAllCategories,
    getCategoriesByKeyword
};
