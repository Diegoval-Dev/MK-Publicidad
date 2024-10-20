export const updateQuoteState = async (quoteId, newState) => {
    // Definir los estados válidos
    const validStates = ['pendiente', 'aprobado', 'rechazado'];

    // Verificar que el estado proporcionado es válido
    if (!validStates.includes(newState)) {
        throw new Error('Estado no válido.');
    }

    // Buscar la cotización en la base de datos
    const quote = await Quote.findByPk(quoteId);
    if (!quote) {
        throw new Error('Cotización no encontrada.');
    }

    // Actualizar el estado
    quote.quote_status = newState;
    await quote.save();

    return quote;
};
