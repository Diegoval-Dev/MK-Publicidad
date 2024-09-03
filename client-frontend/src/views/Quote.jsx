import React, { useEffect, useState } from "react";
import useNavigate from "@hooks/useNavigate";
import NavigationButtons from "@components/NavigationButtons";
import Banner from "@components/Banner";
import QuoteForm from "@components/QuoteForn";

function Quote() {
  const { navigate, params } = useNavigate();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [quotationDetails, setQuotationDetails] = useState({});
  const [unitPrice, setUnitPrice] = useState(80);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setName(params.name);
    setColor(params.color);
    setSize(params.size);
    setQuantity(params.quantity);
    setDescription(params.description);
    const calculatedTotal = unitPrice * params.quantity;
    setTotal(calculatedTotal);

    setQuotationDetails({
      name: params.name,
      description: params.description,
      quantity: params.quantity,
      unitPrice: unitPrice,
      total: calculatedTotal,
      image: params.screenshot
    });
  }, [params, unitPrice]);

  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-white">
      <Banner />
      <NavigationButtons
        onClick={() =>
          navigate("/home/catalogue", { category: params.category })
        }
      />
  
      {/* Título con la línea decorativa */}
      <div className="w-full text-center mt-4 mb-8">
      <h1 className="text-3xl font-bold text-gray-800 relative inline-block mb-8">
  Formulario de Cotización
  <span className="block absolute h-1 bg-green-600 w-full top-full mt-2"></span>
</h1>

      </div>
  
      <div className="w-full flex flex-col lg:flex-row justify-around items-start mt-4">
        <div className="flex flex-col lg:w-1/2 gap-5 ml-4 mb-4 lg:mb-0">
          <div className="flex flex-col justify-center items-start">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="font-bold px-1 py-1 border-b border-color-prices">PRODUCTO</th>
                  <th className="font-bold px-1 py-1 border-b border-color-prices">ID</th>
                  <th className="font-bold px-1 py-1 border-b border-color-prices">COLOR</th>
                  <th className="font-bold px-1 py-1 border-b border-color-prices">TALLA</th>
                  <th className="font-bold px-1 py-1 border-b border-color-prices">CANTIDAD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-2 w-1/3">
                    <div>
                      <span>{params.productName}</span>
                      <br />
                      <img src={params.screenshot} alt="Screenshot" />
                    </div>
                  </td>
                  <td className="px-1 py-1">{params.productId}</td>
                  <td className="px-1 py-1">{color}</td>
                  <td className="px-1 py-1">{size}</td>
                  <td className="px-1 py-1">{quantity}</td>
                </tr>
                <tr>
                  <td colSpan="5" className="px-2 py-2 border-t border-color-prices">
                    <strong className="font-bold">DESCRIPCIÓN</strong><br />{description}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col lg:w-3/5 mb-4 lg:mb-0"> {/* Aumentar el tamaño del formulario */}
          <QuoteForm {...quotationDetails}/>
        </div>
      </div>
    </div>
  );
  
}

export default Quote;