import Quote from '../../models/quotesModel.js'; 

export const createQuote = async (quoteData) => {

  const {
    customer_nit,
    quote_sellerId,
    quote_validityTill,
    quote_shippingTime,
    quote_payMethod,
    quote_credit,
    quote_payForm,
    product_id,
    quote_status,
    quote_img_url, 
  } = quoteData;


  if (
    !customer_nit ||
    !quote_sellerId ||
    !quote_validityTill ||
    !quote_shippingTime ||
    !quote_payMethod ||
    typeof quote_credit === 'undefined' || 
    !quote_payForm ||
    !product_id
  ) {
    throw new Error('Faltan datos requeridos para crear la cotización.');
  }


  try {
    const newQuote = await Quote.create({
      customer_nit,
      quote_date: new Date(), 
      quote_sellerId,
      quote_validityTill,
      quote_shippingTime,
      quote_payMethod,
      quote_credit,
      quote_payForm,
      product_id,
      quote_status: quote_status || 'pendiente', 
      quote_img_url, 
    });

    return newQuote;
  } catch (error) {
    throw new Error(`Error al crear la cotización: ${error.message}`);
  }
};
