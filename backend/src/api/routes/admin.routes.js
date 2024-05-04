import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import productController from '../controllers/productController.js';
import adminController from '../controllers/AdminController.js';
import parser from '../middlewares/imagesMiddleware.js';


const adminRouter = express.Router();

//RUTAS PROTEGIDAS 
// Endpoint para crear un nuevo producto
//adminRouter.post('/products', authMiddleware, parser.single('image'), productController.createProduct);
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
adminRouter.put('/products/:id', productController.updateProduct);

// Endpoint para eliminar un producto
//adminRouter.delete('/products/:id', authMiddleware, productController.deleteProduct);
adminRouter.delete('/products/:id', productController.deleteProduct);

//RUTAS PUBLICAS
//Enlace para registrar un usuario
adminRouter.post('/register', adminController.register);

//Enlace para iniciar sesion
adminRouter.post('/login', adminController.login);

export default adminRouter;