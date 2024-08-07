function quoteSending(email, nit, compania, contacto, phoneNumber, direccion) {
    const quotationDetails = [
        {
          product: "Suéter Negro",
          description: "Suéter de algodón",
          quantity: 10,
          unitPrice: 80.00,
          total: 800.00,
          image: "https://drs.com.gt/wp-content/uploads/2023/09/mapf1-sueter-negro2.png"
        },
        {
          product: "Taza Blanca",
          description: "Taza cerámica",
          quantity: 30,
          unitPrice: 20.00,
          total: 600.00,
          image: "https://amsagt.com/wp-content/uploads/2022/01/6900e507.png"
        }
    ];
      
    const receiver = "pen22217@uvg.edu.gt";

    const quoteConfirmation = async () => {
        const apiURL = `http://localhost:3000/user/send-email`;
    
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