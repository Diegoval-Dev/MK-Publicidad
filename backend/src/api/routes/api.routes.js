import express from 'express';
import { createQuoteController, getQuotesByStatus } from '../controllers/quoteController.js'; 
import { updateQuoteController } from '../controllers/updateQuoteController.js'; 
import authMiddleware from '../middlewares/authMiddleware.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Directorio temporal para almacenar imágenes

router.post('/quote', upload.single('quote_img'), createQuoteController);
router.put('/quote/:id/status', authMiddleware, updateQuoteController);
router.get('/quote/:status', authMiddleware, getQuotesByStatus);

export default router;
