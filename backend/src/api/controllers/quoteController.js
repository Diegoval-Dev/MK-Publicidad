import { createQuote, getQuotesByStatusService } from '../services/quoteService.js'; 
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer'; 
import Joi from 'joi'; 
import fs from 'fs';
import path from 'path';
import { Buffer } from 'buffer'; 
// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


const quoteSchema = Joi.object({
  customer_company: Joi.string().optional(),
  customer_email: Joi.string().email().optional(),
  customer_contact: Joi.string().optional(),
  customer_address: Joi.string().optional(),
  product_id: Joi.number().optional().messages({
    'number.base': 'product_id debe ser un número.',
    'any.required': 'product_id es requerido.',
  }),
  quote_quantity: Joi.number().optional(), 
  quote_details: Joi.string().optional(),
  quote_img_url: Joi.string().uri(),
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
    quote_img, 
  } = req.body;

  const quote_seller_id = "1"; 
  const quote_validity_till = new Date();
  const quote_shipping_time = "1-2 días";
  quote_validity_till.setDate(quote_validity_till.getDate() + 15);
  const quote_pay_method = "Por definir";
  const quote_credit = false;
  const quote_pay_form = "Por definir";
  const quote_status = "pendiente";

  try {
    let quote_img_url = '';

    if (quote_img) {

      const base64Data = quote_img.replace(/^data:image\/png;base64,/, "");
      const filePath = path.join('uploads', `image_${Date.now()}.png`); // Definir la ruta temporal
      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64')); // Guardar la imagen en un archivo temporal

      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'quotes', 
      });

      fs.unlinkSync(filePath);

      quote_img_url = result.secure_url;
    }

    // Crear la cotización
    const newQuote = await createQuote({
      customer_nit,
      quote_seller_id,
      quote_validity_till,
      quote_shipping_time,
      quote_pay_method,
      quote_credit,
      quote_pay_form,
      product_id,
      quote_status,
      quote_quantity,
      quote_details,
      quote_img_url, 
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

export const getQuotesByStatus = async (req, res) => {
  const { status } = req.params; 

  const validStatuses = ['pendiente', 'enviado', 'aceptado', 'rechazado', 'finalizado'];
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: 'Estado inválido. Los estados permitidos son: pendiente, enviado, aceptado, rechazado, finalizado.',
    });
  }

  try {
    const quotes = await getQuotesByStatusService(status);

    if (quotes.length === 0) {
      return res.status(404).json({
        message: `No se encontraron cotizaciones con el estado: ${status}.`,
      });
    }

    return res.status(200).json({
      message: `Cotizaciones con el estado: ${status}`,
      data: quotes,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener las cotizaciones.',
      error: error.message,
    });
  }
};

