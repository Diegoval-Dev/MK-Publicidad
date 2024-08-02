import React, { useEffect, useState, useSyncExternalStore } from "react";
import useNavigate from "@hooks/useNavigate";
import NavigationButtons from "@components/NavigationButtons";
import Banner from "@components/Banner";
import QuoteForm from "@components/QuoteForn";

function Quote() {
  const { navigate, params } = useNavigate();
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [quotationDetails, setQuotationDetails] = useState({});

  useEffect(() => {
    setColor(params.color);
    setSize(params.size);
    setQuantity(params.quantity);
    setDescription(params.description);
    const unitPrice = 80;
    const calculateTotal = quantity * unitPrice;
    setQuotationDetails({
      name: params.name,
      description: params.description,
      quantity: params.quantity,
      unitPrice: unitPrice,
      total: calculateTotal,
      image: params.screenshot
    })

    console.log(quotationDetails)
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-start bg-white">
      <Banner />
      <NavigationButtons
      onClick={() =>
        navigate("/home/catalogue", { category: params.category })
      }
      />

      <div className="w-full flex flex-col lg:flex-row justify-around items-center mt-4">
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
                <td colSpan="5" className="px-2 py-2 border-t border-color-prices"> <strong className="font-bold">DESCRIPCIÓN</strong><br />{description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col lg:w-2/5 mb-4 lg:mb-0">
          <QuoteForm {...quotationDetails}/>
        </div>
      </div>
    </div>
  );
}

export default Quote;