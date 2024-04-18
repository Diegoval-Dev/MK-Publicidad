import React from 'react';
import Banner from '../components/Banner';
import Card from '../components/Card'; 

const CustomizationPage = () => {
  const product = {
    name: "Sudadero Personalizado",
    image: "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-para-Sublimar1.jpg",
    category: "Sudaderos",
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 bg-white">
      <Banner />

      <div className="flex justify-center items-start w-full max-w-4xl px-4 mt-8">
        
        {/* Card solo para la imagen del producto */}
        <div className="flex-1">
          <Card image={product.image} />
        </div>

        {/* Formulario */}
        <div className="flex-1 ml-8">
          <form className="bg-white shadow-md rounded p-4">
            <div>
              <label htmlFor="design" className="block text-sm font-medium text-gray-700">Diseño:</label>
              <input type="text" id="design" name="design" placeholder="Ingresa el diseño" className="mt-1 block w-full border border-gray-300 rounded shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color:</label>
              <select id="color" name="color" className="mt-1 block w-full border border-gray-300 rounded shadow-sm p-2">
                <option value="">Selecciona un color</option>
                <option value="color1">Color 1</option>
                <option value="color2">Color 2</option>
                <option value="color3">Color 3</option>
              </select>
            </div>
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700">Talla:</label>
              <select id="size" name="size" className="mt-1 block w-full border border-gray-300 rounded shadow-sm p-2">
                <option value="">Selecciona una talla</option>
                <option value="small">S</option>
                <option value="medium">M</option>
                <option value="large">L</option>
              </select>
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Cantidad:</label>
              <input type="number" id="quantity" name="quantity" min="1" className="mt-1 block w-full border border-gray-300 rounded shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="additional-description" className="block text-sm font-medium text-gray-700">Descripción Adicional:</label>
              <textarea id="additional-description" name="additional-description" placeholder="Ingresa una descripción adicional" className="mt-1 block w-full border border-gray-300 rounded shadow-sm p-2"></textarea>
            </div>
            <button
             type="submit"
             className="mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-color-button hover:bg-color-button-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-button"
            >
            Solicitar Cotización
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPage;