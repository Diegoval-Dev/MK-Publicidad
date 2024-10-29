import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import verifyAdminRole from '../middlewares/verifyAdminRole.js';
import verifyRoles from '../middlewares/verifyRoles.js';
import productController from '../controllers/productController.js';
import adminController from '../controllers/AdminController.js';
import parser from '../middlewares/imagesMiddleware.js';
import { fetchCategories } from '../controllers/categoryController.js';

const adminRouter = express.Router();

// RUTAS PROTEGIDAS
// Estas rutas requieren autenticación con JWT

// Ruta para crear un producto
/**
 * @openapi
 * /api/admin/products:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Crea un nuevo producto
 *     security:
 *       - bearerAuth: []  # Indica que esta ruta necesita autenticación JWT
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
 *       401:
 *         description: Token faltante o inválido
 *       500:
 *         description: Error en el servidor
 */

adminRouter.post(
  '/products', 
  authMiddleware,   // Verifica si el token es válido
  verifyAdminRole,  // Verifica si el rol es admin  verifyRoles('admin') daria lo mismo,
  (req, res) => {
      console.log(req.body); // <-- Verificar qué datos está recibiendo
      parser.single('image')(req, res, (err) => {
          if (err) {
              console.error(err);
              res.status(500).json({ error: err });
          } else {
              productController.createProduct(req, res);
          }
      });
  }
);

// Ruta para actualizar un producto existente
/**
 * @openapi
 * /api/admin/products/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Actualiza un producto existente
 *     security:
 *       - bearerAuth: []  # Indica que esta ruta necesita autenticación JWT
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
 *       401:
 *         description: Token faltante o inválido
 *       500:
 *         description: Error en el servidor
 */

adminRouter.put(
    '/products/:id', 
    authMiddleware,              // Valida el token JWT
    verifyRoles('admin'),        // Solo los administradores pueden actualizar productos
    productController.updateProduct
);


// Ruta para deshabilitar un producto
/**
 * @openapi
 * /api/admin/products/{id}/disable:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Deshabilita un producto (eliminación lógica)
 *     security:
 *       - bearerAuth: []  # Indica que esta ruta necesita autenticación JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto deshabilitado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
*/
adminRouter.put(
    '/products/:id/disable', 
    authMiddleware,              // Valida el token JWT
    verifyRoles('admin'),        // Solo los administradores pueden deshabilitar productos
    productController.disableProduct // Controlador que actualiza el estado del producto
);



// Ruta para actualizar un usuario (requiere autenticación con JWT)
/**
 * @openapi
 * /api/admin/users/{user_email}:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Actualiza un usuario existente por su correo electrónico
 *     security:
 *       - bearerAuth: []  # Indica que esta ruta necesita autenticación JWT
 *     parameters:
 *       - in: path
 *         name: user_email
 *         schema:
 *           type: string
 *         required: true
 *         description: El correo electrónico del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: Token faltante o inválido
 *       500:
 *         description: Error en el servidor
 */
adminRouter.put('/users/:user_email', authMiddleware, adminController.updateUser);

// Ruta para eliminar un usuario (requiere autenticación con JWT)
/**
 * @openapi
 * /api/admin/users/{user_email}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Elimina un usuario por su correo electrónico
 *     security:
 *       - bearerAuth: []  # Indica que esta ruta necesita autenticación JWT
 *     parameters:
 *       - in: path
 *         name: user_email
 *         schema:
 *           type: string
 *         required: true
 *         description: El correo electrónico del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: Token faltante o inválido
 *       500:
 *         description: Error en el servidor
 */
adminRouter.delete('/users/:user_email', authMiddleware, adminController.deleteUser);

// RUTAS PÚBLICAS
// Estas rutas no requieren autenticación

// Registro de usuario
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
//EN UN FUTURO PROBABLEMENTE TENEMOS QUE PROTEGER REGISTER, YA QUE EN TEORIA SOLO UN ADMIN PODRIA CREAR USUARIOS...
//PERO COMO HAY QUE HACER MIL PRUEBAS MEJOR SEGUIRE CREANDO USUARIOS EN REGISTER!! (MIENTRAS TANTO)

// Inicio de sesión
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
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error en el servidor
 */
adminRouter.post('/login', adminController.login);


//Ruta no protegida solo para mostrar categorias
adminRouter.get('/categories', fetchCategories);

export default adminRouter;
