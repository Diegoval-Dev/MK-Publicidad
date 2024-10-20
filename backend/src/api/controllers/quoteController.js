import { createQuote } from '../services/quoteService.js'; // Importar el servicio de cotización 
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer'; // Importar multer para manejar la subida de archivos
import Joi from 'joi'; // Importar Joi para la validación

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Middleware de multer para manejar la subida de archivos (imágenes)
const upload = multer({ dest: 'uploads/' });

// Definir el esquema de validación con Joi
const quoteSchema = Joi.object({
  customer_nit: Joi.number().required().messages({
    'number.base': 'customer_nit debe ser un número.',
    'any.required': 'customer_nit es requerido.',
  }),
  customer_company: Joi.string().optional(),
  customer_email: Joi.string().email().optional(),
  customer_contact: Joi.string().optional(),
  customer_address: Joi.string().optional(),
  product_id: Joi.number().required().messages({
    'number.base': 'product_id debe ser un número.',
    'any.required': 'product_id es requerido.',
  }),
  quote_quantity: Joi.number().optional(),
  quote_details: Joi.string().optional(),
});

export const createQuoteController = async (req, res) => {
  const {
    customer_company,
    customer_email,
    customer_contact,
    customer_address,
    customer_nit,
    product_id,
    quote_quantity,
    quote_details,
  } = req.body;

  // Validar los datos con Joi
  const { error } = quoteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const quote_sellerId = "1"; // Se asume que el vendedor es el usuario con ID 1
  const quote_validityTill = new Date();
  const quote_shippingTime = "1-2 días";
  quote_validityTill.setDate(quote_validityTill.getDate() + 15); // Validez de la cotización
  const quote_date = new Date();
  const quote_payMethod = "Por definir";
  const quote_credit = false;
  const quote_payForm = "Por definir";
  const quote_status = "pendiente";

  try {
    // Subir la imagen a Cloudinary si existe
    let quote_img_url = '';
    if (req.file) { // Se asume que la imagen se sube como parte del archivo con multer
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'quotes', // Puedes cambiar la carpeta donde almacenarás las imágenes en Cloudinary
      });
      quote_img_url = result.secure_url; // Obtén la URL de la imagen subida
    }

    // Crear la cotización
    const newQuote = await createQuote({
      customer_nit,
      quote_date,
      quote_sellerId,
      quote_validityTill,
      quote_shippingTime,
      quote_payMethod,
      quote_credit,
      quote_payForm,
      product_id,
      quote_status,
      quote_img_url, // Enviar la URL de la imagen a la base de datos
    });

    return res.status(201).json({
      message: 'Cotización creada con éxito.',
      data: newQuote,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al crear la cotización.',
      error: error.message,
    });
  }
};
