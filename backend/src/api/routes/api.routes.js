import express from 'express';
import { createQuoteController } from '../controllers/quoteController.js'; 
import { updateQuoteController } from '../controllers/updateQuoteController.js'; 
import authMiddleware from '../middlewares/authMiddleware.js'; // Middleware de autenticación
import {uploadMiddleware} from '../middlewares/uploadMiddleware.js'; // Middleware de subida de archivos
const router = express.Router();


router.post('/quote', createQuoteController);
router.put('/quote/:id/status', authMiddleware, updateQuoteController);

export default router;
