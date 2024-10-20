import { updateQuoteState } from '../services/quoteStateService.js'; // Importar el servicio para actualizar la cotización
import Joi from 'joi'; // Importar Joi para la validación

// Esquema de validación para el estado de la cotización
const updateQuoteSchema = Joi.object({
  quotation_id: Joi.number().required().messages({
    'number.base': 'quoteId debe ser un número.',
    'any.required': 'quoteId es requerido.',
  }),
  newState: Joi.string().valid('pendiente', 'aprobado', 'rechazado').required().messages({
    'string.base': 'newState debe ser una cadena de texto.',
    'any.only': 'newState debe ser uno de: pendiente, aprobado, rechazado.',
    'any.required': 'newState es requerido.',
  }),
});

// Controlador para actualizar el estado de la cotización
export const updateQuoteController = async (req, res) => {
  const { quotation_id, newState } = req.body;

  // Validar los datos con Joi
  const { error } = updateQuoteSchema.validate({ quotation_id, newState });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Llamar al servicio para actualizar el estado de la cotización
    const updatedQuote = await updateQuoteState(quotation_id, newState);

    return res.status(200).json({
      message: 'Estado de la cotización actualizado con éxito.',
      data: updatedQuote,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar el estado de la cotización.',
      error: error.message,
    });
  }
};
