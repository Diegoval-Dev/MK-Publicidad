'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavigationButtons from '@components/utils/NavigationButtons';
import QuoteForm from '@components/quote/QuoteForm';

export default function Quote() {
  const router = useRouter();

  // Estados para los datos cargados desde localStorage
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [screenshot, setScreenshot] = useState('');
  const [category, setCategory] = useState('');
  const [unitPrice, setUnitPrice] = useState(80);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Obtener datos desde localStorage
    const customizationData = JSON.parse(localStorage.getItem('customizationData'));
    if (customizationData) {
      setName(customizationData.name || '');
      setColor(customizationData.color || '');
      setSize(customizationData.size || '');
      setQuantity(customizationData.quantity || 0);
      setDescription(customizationData.description || '');
      setProductName(customizationData.name || '');
      setProductId(customizationData.productId || '');
      setScreenshot(customizationData.screenshot || '');
      setCategory(customizationData.category || ''); // Obtener la categoría guardada
    }
  }, []);

  useEffect(() => {
    // Calcular el total basado en la cantidad y el precio unitario
    const calculatedTotal = unitPrice * quantity;
    setTotal(calculatedTotal);
  }, [quantity, unitPrice]);

  const quotationDetails = {
    name,
    description,
    quantity,
    unitPrice,
    total,
    image: screenshot,
    id: productId,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Contenedor del botón de navegación */}
      <div className="flex justify-start items-center p-4">
        <NavigationButtons />
      </div>

      {/* Título con la línea decorativa */}
      <div className="w-full text-center mt-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 relative inline-block mt-0 mb-4">
          Formulario de Cotización
          <span className="block absolute h-1 bg-green-600 w-full top-full mt-2"></span>
        </h1>
      </div>

      {/* Contenedor principal ajustado con flexbox */}
      <div className="w-full flex flex-row lg:flex-row lg:justify-center items-center lg:items-start mt-4 gap-4">
        {/* Contenedor de la información del producto */}
        <div className="flex-1 flex flex-col gap-5 ml-12">
          <div className="flex flex-col justify-center items-start">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="font-bold px-1 py-1 border-b border-color-prices">PRODUCTO</th>
                  <th className="font-bold px-1 py-1 border-b border-color-prices">ID</th>
                  <th className="font-bold px-1 py-1 border-b border-color-prices">COLOR</th>
                  {size && <th className="font-bold px-1 py-1 border-b border-color-prices">TALLA</th>}
                  <th className="font-bold px-1 py-1 border-b border-color-prices">CANTIDAD</th>
                </tr>
              </thead>
              <tbody>
                <tr className='text-center'>
                  <td className="px-2 py-2 w-1/3">
                    <div>
                      <br />
                      {screenshot && <img src={screenshot} alt="Screenshot" className="max-w-full h-auto" />}
                    </div>
                  </td>
                  <td className="px-1 py-1">{productId}</td>
                  <td className="px-1 py-1">{color}</td>
                  {size && <td className="px-1 py-1">{size}</td>}
                  <td className="px-1 py-1">{quantity}</td>
                </tr>
                <tr>
                  <td colSpan="5" className="px-2 py-2 border-t border-color-prices">
                    <strong className="font-bold">DESCRIPCIÓN</strong>
                    <br />
                    {description}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Contenedor del formulario de cotización */}
        <div className="flex-1 flex flex-col lg:ml-4">
          <QuoteForm {...quotationDetails} />
        </div>
      </div>
    </div>


  );
}
