const quoteCreation = async (
    customer_nit,
    customer_company,
    customer_email,
    customer_contact,
    customer_address,
    product_id,
    quote_quantity,
    quote_details,
    quote_img 
) => {
    const apiURL = `http://localhost:3000/api/quote`;

    // Usamos FormData para enviar los datos y la imagen
    const formData = new FormData();
    formData.append('customer_nit', customer_nit);
    formData.append('customer_company', customer_company);
    formData.append('customer_email', customer_email);
    formData.append('customer_contact', customer_contact);
    formData.append('customer_address', customer_address);
    formData.append('product_id', product_id);
    formData.append('quote_quantity', quote_quantity);
    formData.append('quote_details', quote_details);

    if (quote_img) {
        formData.append('quote_img', quote_img); 
    }

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            return true;
        } else {
            console.error('Error en la respuesta de la API', response.statusText);
        }
    } catch (error) {
        console.error("Ocurrió un error al solicitar la cotización:", error);
    }
};



const quoteSending = async (email, nit, compania, contacto, phoneNumber, direccion, quotationDetails) => {
    const apiURL = `http://localhost:3000/user/send-email`;
    console.log(quotationDetails);

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ nit, compania, contacto, phoneNumber, direccion, email, quotationDetails })
        });

        if (response.ok) {
            return true;
        }
    } catch (error) {
        console.error("Ocurrió un error al enviar la confirmación de la cotización:", error);
    }
};

export { quoteSending, quoteCreation };
