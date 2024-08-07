async function quoteSending(email, nit, compania, contacto, phoneNumber, direccion, quotationDetails) {
      
    let receiver = "pen22217@uvg.edu.gt";

    const quoteConfirmation = async () => {
        const apiURL = `http://localhost:3000/user/send-email`;
        console.log(quotationDetails)
    
        try {
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({nit, compania, contacto, phoneNumber, direccion, receiver, quotationDetails})
            });
            
            if (response.ok) {
                alert("Correo enviado con éxito.");
                return true;
            }
        } catch (error) {
            console.error("Ocurrió un error al solicitar la cotización:", error);
        }
    }

    return quoteConfirmation()
}

export default quoteSending;