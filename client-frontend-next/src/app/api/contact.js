const API_URL = `http://localhost:3000/user`

export const contact = async (
    customer_name,
    customer_email,
    customer_comment
) => {
    try {
        const response = await fetch('http://localhost:3000/user/feedback', {
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