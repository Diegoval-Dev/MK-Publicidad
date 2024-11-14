const API_URL = `http://localhost:3000/user`

export const contact = async (
    customer_name,
    customer_email,
    customer_comment
) => {
    try {
        const response = await fetch(`${API_URL}/feedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customer_name, customer_email, customer_comment })
        });

        if (response.ok) {
            console.log("Comentario enviado exitosamente:", response);
            return true;
        } else {
            console.error("Error en la respuesta de la API:", response.statusText);
            return false;
        }

    } catch (error) {
        console.error("Ocurrió un error al enviar el comentario:", error);
        return false;
    }
};

export const subscribe = async (
    customer_email
) => {
    try {
        const response = await fetch(`${API_URL}/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ customer_email })
        });

        if (response.ok) {
            console.log("Suscripción realizada exitosamente:", response);
            return true;
        
        } else {
            return false;
        }

    } catch (error) {
        console.error("Ocurrió un error al realizar la suscripción: ", error);
        return false;
    }
};