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
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               material:
 *                 type: string
 *               description:
 *                 type: string
 *               size:
 *                 type: string
 *               color:
 *                 type: string
 *               technique:
 *                 type: string
 *               image:
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
    console.log("ENTRO Al controller");
    try {
        const { name, category, material, description, size, color, technique } = req.body;

        // Verifica si hay un archivo de imagen cargado
        console.log("Req Body:", req.body);
        console.log("Req File:", req.file);
        let image = null;
        if (req.file) {
            image = req.file.path;
            console.log("File path:", image);
        } else {
            console.log("File not uploaded.");
        }
        const product = { name, category, material, description, image, size, color, technique };

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
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del producto
 *       - in: query
 *         name: material
 *         schema:
 *           type: string
 *         description: Material del producto
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Categoría del producto
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
        const { name, material, category } = req.query;
        const filters = { name, material, category };
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
            res.status(404).json({ message: 'Product not found' });
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
        const { name, category, material, description, image } = req.body;
        const updatedProduct = await productService.updateProduct(id, { name, category, material, description, image });
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
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la categoría
 *     responses:
 *       200:
 *         description: Opciones de filtrado obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 materials:
 *                   type: array
 *                   items:
 *                     type: string
 *                 sizes:
 *                   type: array
 *                   items:
 *                     type: string
 *                 colors:
 *                   type: array
 *                   items:
 *                     type: string
 *                 techniques:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Error en el servidor
 */
const getFilterOptionsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const filters = await productService.getFilterOptionsByCategory(category);

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
 *                 type: string
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
 *                 type: string
 *                 example: "camisetas"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error en el servidor"
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
