'use client';

import React, { useEffect, useState } from 'react'

const Pending = () => {
  
  const example = {
        "quotation_id": 1,
        "customer_nit": 1234567,
        "quote_no": 1,
        "quote_date": "2024-10-20",
        "quote_seller_id": 1,
        "quote_validity_till": "2024-11-04",
        "quote_shipping_time": "1-2 días",
        "quote_pay_method": "Por definir",
        "quote_credit": false,
        "quote_pay_form": "Por definir",
        "product_id": 1,
        "quote_status": "pendiente",
        "quote_img_url": "https://res.cloudinary.com/dmafdgdz3/image/upload/v1729461952/quotes/mpvmua1fzfybyxwnz1yz.png",
        "quote_quantity": 3,
        "quote_details": "Dfnjehnvseijfnvejilkgnvjseirngveijsbnvjeisvneijnvejskvnjefskvbn dfjskvbndfjhsbvkdse"
      }

  const [quotes, setQuotes] = useState([]);
  console.log(quotes)
  
  async function  getPendingQuotes() {
    const response = await fetch(`http://localhost:3000/api/quote/pendiente`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    })

    if (response.ok) {
      const data = await response.json();
      const quoteArray = Array.isArray(data) ? data : [];
      setQuotes(quoteArray);
    } else {
      throw new Error("Ocurrió un error al obtener las cotizaciones.")
    }
  }

  useEffect(() => {
    getPendingQuotes();
  }, []);

  return (
    <div className='py-8'>
      {quotes.length === 0 ? (
        <p>No hay cotizaciones pendientes</p>
      ) : (
        quotes.map((quote, index) => {
          return(
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
                      <td><img className='table_img' src={quote.quote_img_url} alt="Imagen del producto"/></td>
                      <td>{quote.quote_seller_id}</td>
                      <td>PRECIO</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className=' flex flex-column justify-between'>
                    <div>
                        <h1>Método de pago: {quote.quote_pay_method}</h1>
                        <h1>Forma de pago: {quote.quote_pay_form}</h1>
                    </div>
                  <h1>Estado: {quote.quote_status}</h1>
                </div>
            </div>
          )
        })
      )}
      <div className='flex flex-column justify-self-center'>
        <button className="w-full bg-color-button text-white font-bold py-2 px-4 rounded-lg hover:bg-color-symbols transition-colors mx-5">Aceptar</button>
        <button className="w-full bg-color-button text-white font-bold py-2 px-4 rounded-lg hover:bg-color-symbols transition-colors">Rechazar</button>
      </div>
    </div>
  )
}

export default Pending