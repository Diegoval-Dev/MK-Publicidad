import express from "express";
import productController from '../controllers/productController.js';
import { Resend } from "resend";

const router = express.Router();
const resend = new Resend("re_W7fQeeRt_Fx4JciPu3LhhBRU843mLEPmR");

// Ruta unificada para obtener productos con cualquier combinación de filtros
router.get('/products', productController.getAllProducts);

// Ruta para enviar correos de confirmación al usuario
router.get("/send-email", async (req, res) => {
  const { receiver } = req.params;
  const { data, error } = await resend.emails.send({
    from: "MK-Publicidad <onboarding@resend.dev>",
    to: ['pen22217@uvg.edu.gt'],
    subject: "Confirmación",
    html: "<strong>Su producto está siendo procesado.</strong>",
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});

// Ruta para obtener los filtros posibles por categoria
router.get('/filters/:category', productController.getFilterOptionsByCategory);
router.get('/categories', productController.getAllCategories);

export default router;
