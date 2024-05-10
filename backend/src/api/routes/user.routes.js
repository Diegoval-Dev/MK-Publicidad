import express from 'express';
import productController from '../controllers/productController.js';
import sendEmail from '../services/MailService.js';

const router = express.Router();

// Ruta unificada para obtener productos con cualquier combinación de filtros
router.get('/products', productController.getAllProducts);

router.post('/send-email', MailService.sendEmail)

export default router;
