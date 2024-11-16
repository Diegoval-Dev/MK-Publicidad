'use client';

import React, { useEffect, useState } from 'react';

const Accepted = () => {
  const [quotes, setQuotes] = useState([]);
  console.log(quotes);

  // Función para obtener las cotizaciones aceptadas
  async function getAcceptedQuotes() {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage

    // Verificamos si existe el token
    if (!token) {
      console.error("Token no encontrado en localStorage");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/quote/aceptado`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}` // Agregamos el token en los headers
        }
      });

      if (response.ok) {
        const data = await response.json();
        const quoteArray = Array.isArray(data) ? data : [];
        setQuotes(quoteArray);
      } else {
        throw new Error("Ocurrió un error al obtener las cotizaciones.");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  }

  // Llamamos a la función al montar el componente
  useEffect(() => {
    getAcceptedQuotes();
  }, []);

  return (
    <div className='py-8'>
      {quotes.length === 0 ? (
        <p>No hay cotizaciones aceptadas</p>
      ) : (
        quotes.map((quote, index) => (
          <div className='flex flex-col justify-center align-middle' key={index}>
            <div>
              <h1 className='centered-title'>Cotización número {quote.quote_no}</h1>
            </div>
            <div className='flex flex-row justify-between'>
              <div>
                <h1>Nit: {quote.customer_nit}</h1>
                <h1>Fecha de emisión: {quote.quote_date}</h1>
              </div>
              <h1>Tiempo estimado: {quote.quote_shipping_time}</h1>
              <h1>Válido hasta {quote.quote_validity_till}</h1>
            </div>
            <div className='table-wrapper'>
              <table className='fl-table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cantidad</th>
                    <th>Descripción</th>
                    <th>Imagen</th>
                    <th>Vendedor</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{quote.product_id}</td>
                    <td>{quote.quote_quantity}</td>
                    <td>{quote.quote_details}</td>
                    <td><img className='table_img' src={quote.quote_img_url} alt="Imagen del producto" /></td>
                    <td>{quote.quote_seller_id}</td>
                    <td>PRECIO</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='flex flex-column justify-between'>
              <div>
                <h1>Método de pago: {quote.quote_pay_method}</h1>
                <h1>Forma de pago: {quote.quote_pay_form}</h1>
              </div>
              <h1>Estado: {quote.quote_status}</h1>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Accepted;
