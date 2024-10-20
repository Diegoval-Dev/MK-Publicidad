const quoteCreation = async (customer_nit, quote_no, quote_date, quote_sellerId, quote_validityTill, quote_shippingTime, quote_payMethod, quote_credit, quote_payForm, productDetails, quote_status) => {
    const apiURL = `http://localhost:3000/api/quote`;

    const payload = {
        customer_nit,            
        quote_no,                
        quote_date,              
        quote_sellerId,          
        quote_validityTill,      
        quote_shippingTime,      
        quote_payMethod,         
        quote_credit,            
        quote_payForm,           
        product_id: productDetails.name, 
        quote_status,            
        product: {
            name: productDetails.name,
            description: productDetails.description,
            quantity: productDetails.quantity,
            unitPrice: productDetails.unitPrice,
            total: productDetails.total,
            image: productDetails.image 
        }
    };

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
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
