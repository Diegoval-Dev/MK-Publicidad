import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    setColor(params.color);
    setSize(params.size);
    setQuantity(params.quantity);
    setDescription(params.description);
  }, []);
	

  return (
    <div className="min-h-screen flex flex-col justify-start bg-white">
      <Banner />
      <NavigationButtons
        onClick={() =>
          navigate("/home/catalogue", { category: params.category })
        }
      />

      <div className="w-full flex flex-row justify-around items-center">
        <div className="flex flex-row w-2/3 gap-5">
          <img src={params.screenshot} alt="Screenshot" className="w-80" />
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-3xl font-bold text-gray-800 mt-8">
              ID: {params.productId}
            </h1>
            <p>Color: {color}</p>
            <p>Size: {size}</p>
            <p>Quantity: {quantity}</p>
            <p>Description: {description}</p>
            <p>Diseño:</p>
          </div>
        </div>
        <div className="flex flex-col items-start w-1/3">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}

export default Quote;
