import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import productController from '../controllers/productController.js';
import adminController from '../controllers/AdminController.js';
import parser from '../middlewares/imagesMiddleware.js';


const adminRouter = express.Router();

//RUTAS PROTEGIDAS 
// Endpoint para crear un nuevo producto

adminRouter.post('/products', authMiddleware, parser.single('image'), productController.createProduct);

/**
 * @openapi
 * /api/admin/products:
 *   post:
 *     tags:
 *       - Admin
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
adminRouter.post('/products', (req, res) => {
    parser.single('image')(req, res, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: err });
      } else {
        productController.createProduct(req, res);
      }
    });
  });

// Endpoint para actualizar un producto existente
//adminRouter.put('/products/:id', authMiddleware, productController.updateProduct);
/**
 * @openapi
 * /api/admin/products/{id}:
 *   put:
 *     tags:
 *       - Admin
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
adminRouter.put('/products/:id', productController.updateProduct);

// Endpoint para eliminar un producto
//adminRouter.delete('/products/:id', authMiddleware, productController.deleteProduct);
/**
 * @openapi
 * /api/admin/products/{id}:
 *   delete:
 *     tags:
 *       - Admin
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
adminRouter.delete('/products/:id', productController.deleteProduct);

//RUTAS PUBLICAS
//Enlace para registrar un usuario
/**
 * @openapi
 * /api/admin/register:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Registra un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error en el servidor
 */
adminRouter.post('/register', adminController.register);

//Enlace para iniciar sesion
/**
 * @openapi
 * /api/admin/login:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Inicia sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *               user_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error en el servidor
 */
adminRouter.post('/login', adminController.login);

export default adminRouter;