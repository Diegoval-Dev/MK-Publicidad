import { createQuote } from '../services/quoteService'; // Importar el servicio de cotización

export const createQuoteController = async (req, res) => {
  const {
    customer_nit,
    quote_no,
    quote_date,
    quote_sellerId,
    quote_validityTill,
    quote_shippingTime,
    quote_payMethod,
    quote_credit,
    quote_payForm,
    product_id,
    quote_status
  } = req.body;

  // Validar que los datos necesarios están presentes
  if (!customer_nit || !product_id || !quote_no || !quote_date || !quote_sellerId) {
    return res.status(400).json({
      message: 'Faltan datos obligatorios. Asegúrate de enviar customer_nit, product_id, quote_no, quote_date y quote_sellerId.',
    });
  }

  try {
    // Llamar al servicio para crear la cotización
    const newQuote = await createQuote({
      customer_nit,
      quote_no,
      quote_date,
      quote_sellerId,
      quote_validityTill,
      quote_shippingTime,
      quote_payMethod,
      quote_credit,
      quote_payForm,
      product_id,
      quote_status,
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
