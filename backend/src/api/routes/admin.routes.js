import express from 'express';
import productController from '../controllers/productController.js';

const adminRouter = express.Router();

// Endpoint para crear un nuevo producto
adminRouter.post('/products', productController.createProduct);

// Endpoint para actualizar un producto existente
adminRouter.put('/products/:id', productController.updateProduct);

// Endpoint para eliminar un producto
adminRouter.delete('/products/:id', productController.deleteProduct);

export default adminRouter;