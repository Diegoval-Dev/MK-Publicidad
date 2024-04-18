// CustomizationPage.js
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
        <Card image={product.image} />
        {/*  */}
      </div>
    </div>
  );
};

export default CustomizationPage;
