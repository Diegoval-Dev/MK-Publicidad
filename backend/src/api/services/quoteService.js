import Joi from 'joi';
import Quote from '../../models/quotesModel.js'; 

// Esquema de validación usando Joi
const quoteSchema = Joi.object({
  customer_nit: Joi.number().required(),
  quote_seller_id: Joi.number().required(),
  quote_validity_till: Joi.date().required(),
  quote_shipping_time: Joi.string().allow(null, '').optional(),
  quote_pay_method: Joi.string().required(),
  quote_credit: Joi.boolean().required(),
  quote_pay_form: Joi.string().required(),
  product_id: Joi.number().required(),
  quote_status: Joi.string().valid('pendiente', 'aprobado', 'rechazado').optional(),
  quote_img_url: Joi.string().uri().allow(null, '').optional(),
  quote_quantity: Joi.number().required(),
  quote_details: Joi.string().required(),
});

export const createQuote = async (quoteData) => {
  try {
    // Validar los datos usando Joi
    const { error, value } = quoteSchema.validate(quoteData);
    if (error) {
      throw new Error(`Datos inválidos: ${error.details[0].message}`);
    }

    const {
      customer_nit,
      quote_seller_id,
      quote_validity_till,
      quote_shipping_time,
      quote_pay_method,
      quote_credit,
      quote_pay_form,
      product_id,
      quote_status,
      quote_img_url,
      quote_quantity,
      quote_details,
    } = value;

    // Crear la cotización en la base de datos
    const newQuote = await Quote.create({
      customer_nit,
      quote_date: new Date(), 
      quote_seller_id,
      quote_validity_till,
      quote_shipping_time,
      quote_pay_method,
      quote_credit,
      quote_pay_form,
      product_id,
      quote_status: quote_status || 'pendiente',
      quote_img_url,
      quote_quantity,
      quote_details,
    });

    return newQuote;
  } catch (error) {
    throw new Error(`Error al crear la cotización: ${error.message}`);
  }
};
