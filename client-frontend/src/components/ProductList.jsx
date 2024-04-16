import React, { useState, useEffect } from 'react';
import Card from './Card';

function ProductList({category, material, technique, size, color}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchProducts = async () => {
    //   const response = await fetch('http://localhost:3000/products');
    //   const data = await response.json();
    //   setProducts(data);
    //   setLoading(false);
    // };
    //fetchProducts();

    // Objeto de Prueba
    // Objeto de Prueba
    const products = [
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },

    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },

    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },

    {
      "name": "Sudadero Personalizado",
      "image": "https://novocolor.com.gt/wp-content/uploads/2021/05/Sudadero-con-Zipper-para-Sublimar1.jpg",
      "category": "Sudaderos",
      "material": "Algodón",
      "description": "Sudadero cómodo y fresco."
    },
    ]
    setProducts(products);
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <>
      <h2 className='titleAdmin' style={{alignSelf: "flex-start", fontSize: "25px", margin: "2%"}}>{products[0].category}</h2>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", }}>
          {products.map((product, index) => {
          return (
                  <div key={index} style={{margin: "1%"}}>
                      {Card(product)}
                  </div>  
              )
              })
          }
      </div>
    </>
  );
}

export default ProductList;