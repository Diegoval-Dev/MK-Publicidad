import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import productController from '../controllers/productController.js';
import adminController from '../controllers/AdminController.js';


const adminRouter = express.Router();

//RUTAS PROTEGIDAS 
// Endpoint para crear un nuevo producto
adminRouter.post('/products', authMiddleware, productController.createProduct);

// Endpoint para actualizar un producto existente
adminRouter.put('/products/:id', authMiddleware, productController.updateProduct);

// Endpoint para eliminar un producto
adminRouter.delete('/products/:id', authMiddleware, productController.deleteProduct);

//RUTAS PUBLICAS
//Enlace para registrar un usuario
adminRouter.post('/register', adminController.register);

//Enlace para iniciar sesion
adminRouter.post('/login', adminController.login);

export default adminRouter;