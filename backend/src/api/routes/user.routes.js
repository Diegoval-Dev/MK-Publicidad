import express from "express";
import productController from '../controllers/productController.js';
import template from "../../assets/template.js";
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
const resend = new Resend(process.env.RESEND_KEY);

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Obtiene todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/products', productController.getAllProducts);

router.get('/products/category/:category_id', productController.getProductsByCategory);

/**
 * @openapi
 * /send-email:
 *   post:
 *     summary: Envía cotizaciones por correo electrónico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiver:
 *                 type: string
 *                 description: Dirección de correo electrónico del destinatario
 *                 example: cliente@example.com
 *               quotationDetails:
 *                 type: array
 *                 description: Detalles de la cotización
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: Nombre del producto
 *                       example: "Suéter Negro"
 *                     description:
 *                       type: string
 *                       description: Descripción del producto
 *                       example: "Suéter de algodón"
 *                     quantity:
 *                       type: integer
 *                       description: Cantidad del producto
 *                       example: 10
 *                     unitPrice:
 *                       type: number
 *                       format: float
 *                       description: Precio unitario del producto
 *                       example: 80.00
 *                     total:
 *                       type: number
 *                       format: float
 *                       description: Precio total del producto
 *                       example: 800.00
 *                     image:
 *                       type: string
 *                       description: URL de la imagen del producto
 *                       example: "https://drs.com.gt/wp-content/uploads/2023/09/mapf1-sueter-negro2.png"
 *     responses:
 *       200:
 *         description: Correo enviado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 */
router.post("/send-email", async (req, res) => {
  const { nit, compania, contacto, phoneNumber, direccion, email, quotationDetails } = req.body;
  
  const emailTemplate = template(nit, compania, contacto, phoneNumber, direccion, email, quotationDetails);
  
  const { data, error } = await resend.emails.send({
    from: "MK-Publicidad <onboarding@diegovalenzuela.me>",
    to: [`${email}`],
    subject: "Confirmación de cotización",
    html: emailTemplate,
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});

/**
 paths:
  /feedback:
    post:
      summary: Envía un comentario de usuario a través de correo electrónico
      description: Esta ruta permite que los usuarios envíen un comentario, el cual es recibido por correo electrónico.
      tags:
        - Feedback
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                customer_name:
                  type: string
                  description: Nombre del usuario que envía el comentario
                  example: "Juan Pérez"
                customer_email:
                  type: string
                  format: email
                  description: Correo electrónico del usuario
                  example: "juanperez@example.com"
                customer_comment:
                  type: string
                  description: Comentario del usuario
                  example: "Estoy muy satisfecho con el servicio."
      responses:
        '200':
          description: Comentario enviado exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: object
                    description: Detalles de la respuesta del servicio de correo
        '400':
          description: Error al enviar el comentario
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Descripción del error
 */
router.post("/feedback", async (req, res) => {
  const { customer_name, customer_email, customer_comment } = req.body;
  console.log(req.body)
  const { data, error } = await resend.emails.send({
    from: `${customer_name} <onboarding@diegovalenzuela.me>`,
    to: ["danielpenedo2@gmail.com"],
    subject: "Nuevo comentario de usuario",
    html: `<p><strong>Nombre:</strong> ${customer_name}</p>
          <p><strong>Email:</strong> ${customer_email}</p>
          <p><strong>Mensaje:</strong> ${customer_comment}</p>`,
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});

// Ruta para obtener los filtros posibles por categoria
/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene los filtros posibles por categoria
 *     responses:
 *       200:
 *         description: Lista de filtros de cada categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/filters/:category', productController.getFilterOptionsByCategory);

/**
 * @swagger
 * /products/categories:
 *   get:
 *     summary: Obtiene todas las categorías con una imagen representativa
 *     responses:
 *       200:
 *         description: Lista de categorías con imágenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   image:
 *                     type: string
 */
router.get('/categories', productController.getAllCategories);


/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene un producto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error en el servidor
 */
router.get('/products/:id', productController.getProductById);

//Ruta para endpoint de search bar de categorias
/**
 * @swagger
 * /products/search/categories:
 *   get:
 *     summary: Busca categorías por palabra clave
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: Palabra clave para buscar categorías
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   image:
 *                     type: string
 */
router.get('/search/categories', productController.getCategoriesByKeyword);

export default router;
