import express from 'express';
import { createQuoteController } from '../controllers/quoteController.js'; // Asegúrate de que este controlador esté bien importado
import authMiddleware from '../middlewares/authMiddleware.js'; // Middleware de autenticación
import {uploadMiddleware} from '../middlewares/uploadMiddleware.js'; // Middleware de subida de archivos
const router = express.Router();


router.post('/quote', uploadMiddleware, createQuoteController);

export default router;
