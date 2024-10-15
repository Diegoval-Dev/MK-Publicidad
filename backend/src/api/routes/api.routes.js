import express from 'express';
import { createQuoteController } from '../controllers/quoteController.js'; // Asegúrate de que este controlador esté bien importado
import authMiddleware from '../middlewares/authMiddleware.js'; // Middleware de autenticación
const router = express.Router();

// Ruta protegida para crear una nueva cotización
router.post('/quote', authMiddleware, createQuoteController);

export default router;
