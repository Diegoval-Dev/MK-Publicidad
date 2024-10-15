import Quote from '../../models/quotesModel.js'; 

export const createQuote = async (quoteData) => {
  // Validación de los datos
  const {
    customer_nit,
    quote_no,
    quote_sellerId,
    quote_validityTill,
    quote_shippingTime,
    quote_payMethod,
    quote_credit,
    quote_payForm,
    product_id,
    quote_status,
  } = quoteData;

  // Validar si los campos obligatorios están presentes
  if (
    !customer_nit ||
    !quote_no ||
    !quote_sellerId ||
    !quote_validityTill ||
    !quote_shippingTime ||
    !quote_payMethod ||
    typeof quote_credit === 'undefined' || // Asegurarse de que el campo booleano se valida correctamente
    !quote_payForm ||
    !product_id
  ) {
    throw new Error('Faltan datos requeridos para crear la cotización.');
  }

  // Crear la cotización en la base de datos
  try {
    const newQuote = await Quote.create({
      customer_nit,
      quote_no,
      quote_date: new Date(), // Se asigna la fecha actual al crear la cotización
      quote_sellerId,
      quote_validityTill,
      quote_shippingTime,
      quote_payMethod,
      quote_credit,
      quote_payForm,
      product_id,
      quote_status: quote_status || 'pendiente', // Estado por defecto
    });

    return newQuote;
  } catch (error) {
    throw new Error(`Error al crear la cotización: ${error.message}`);
  }
};
