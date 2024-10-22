import productService from '../services/productService.js';

/**
 * @openapi
 * /api/admin/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Creates a new product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               capacity:
 *                 type: string
 *               size:
 *                 type: string
 *               image_url:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
const createProduct = async (req, res) => {
    try {
        const { product_name, product_code, category_id, capacity, size } = req.body;

        // Check if an image file is uploaded
        let image_url = null;
        if (req.file) {
            image_url = req.file.path;
        }

        const product = { product_name, product_code, category_id, capacity, size, image_url };

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
 *     summary: Retrieves all products with optional filters
 *     parameters:
 *       - in: query
 *         name: product_name
 *         schema:
 *           type: string
 *         description: Product name
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *         description: Category ID of the product
 *       - in: query
 *         name: capacity
 *         schema:
 *           type: string
 *         description: Product capacity
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *         description: Product size
 *     responses:
 *       200:
 *         description: List of products successfully retrieved
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
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: integer
 *                       product_name:
 *                         type: string
 *                       product_code:
 *                         type: string
 *                       category:
 *                         type: string
 *                       capacity:
 *                         type: string
 *                       size:
 *                         type: string
 *                       image_url:
 *                         type: string
 *                       colors:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             color_name:
 *                               type: string
 *                             hex_code:
 *                               type: string
 *       500:
 *         description: Server error
 */
const getAllProducts = async (req, res) => {
    try {
        const filters = {
            product_name: req.query.name || undefined,
            category_name: req.query.category || undefined, // Changed to search by category name
            material: req.query.material || undefined,
            capacity: req.query.capacity || undefined,
            size: req.query.size || undefined
        };
        console.log("BACKEND FILTERS", filters);
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
 *     summary: Retrieves a product by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_id:
 *                   type: integer
 *                 product_name:
 *                   type: string
 *                 product_code:
 *                   type: string
 *                 category_id:
 *                   type: integer
 *                 capacity:
 *                   type: string
 *                 size:
 *                   type: string
 *                 image_url:
 *                   type: string
 *                 colors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       color_name:
 *                         type: string
 *                       hex_code:
 *                         type: string
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productService.getProductById(id);
        
        if (product) {
            res.status(200).json({
                product_id: product.product_id,
                product_name: product.product_name,
                product_code: product.product_code,
                category_name: product.Category ? product.Category.category_name : null,
                capacity: product.capacity,
                size: product.size,
                image_url: product.image_url,
                colors: product.Colors.map(color => ({
                    color_name: color.color_name,
                    hex_code: color.hex_code
                }))
            });
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
 *     summary: Updates an existing product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { product_name, category_id, capacity, size, image_url } = req.body;
        const updatedProduct = await productService.updateProduct(id, { product_name, category_id, capacity, size, image_url });
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
 *     summary: Deletes a product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
const disableProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productService.disableProduct(id);  // Llama al servicio para deshabilitar el producto
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
 *     summary: Retrieves filtering options for a specific category
 *     parameters:
 *       - in: path
 *         name: category_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Filtering options successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 capacities:
 *                   type: array
 *                   items:
 *                     type: string
 *                 sizes:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Server error
 */
const getFilterOptionsByCategory = async (req, res) => {
    try {
        const category_id = req.params.category_id;
        const filters = await productService.getFilterOptionsByCategory(category_id);

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
 *     summary: Retrieves all available categories
 *     responses:
 *       200:
 *         description: Categories successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category_id:
 *                     type: integer
 *                   image_url:
 *                     type: string
 *       500:
 *         description: Server error
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
 *     summary: Retrieves product categories that match a keyword
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: false
 *         description: Keyword to search for categories
 *         example: "t-shirts"
 *     responses:
 *       200:
 *         description: Categories found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category_id:
 *                     type: integer
 *                   image_url:
 *                     type: string
 *       500:
 *         description: Server error
 */
const getCategoriesByKeyword = async (req, res) => {
    try {
        const keyword = req.query.keyword || ''; // Retrieve the keyword from query parameters
        const categories = await productService.getCategoriesByKeyword(keyword);
        console.log("###########categories RESPUESTA", categories);
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
    disableProduct,
    getFilterOptionsByCategory,
    getAllCategories,
    getCategoriesByKeyword
};
