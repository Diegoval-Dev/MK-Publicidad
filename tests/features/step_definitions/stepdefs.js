// stepdefs.js
const assert = require('assert');
const { Given, Then, When } = require('@cucumber/cucumber');

async function loadAllProducts() {
  const apiURL = `http://localhost:3000/user/products`;
  
  try {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("Todos los productos");
      console.log(data);
      return Array.from(data);
    } else {
      throw new Error("No fue posible obtener los productos.");
    };
    
  } catch (error) {
    console.log("Ocurrió un error al obtener los productos:", error);
    throw error;
  };
};

async function loadProductsByName(name) {
  const apiURL = `http://localhost:3000/user/products?name=${name}`;
  
  try {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Productos por nombre");
      console.log(data);
      return Array.from(data);

    } else {
      throw new Error("Ocurrió un error al obtener los productos.")

    };
    
  } catch (error) {
    console.error(error);

  };
};

Given('que estoy en la página del catálogo', async function () {
  await loadAllProducts();
});

Then('debería ver la lista de productos disponibles', async function () {
  try {
    const productList = await loadAllProducts();
    assert.ok(Array.isArray(productList), 'La lista de productos no está disponible');
    
  } catch (error) {
    assert.fail(error.message);
  };
});

When('ingreso el nombre del producto', async function () {
  await loadProductsByName("Suéter")
});

Then('debería ver la lista de productos con ese nombre', async function () {
  try {
    const productList = await loadProductsByName("Suéter");
    assert.ok(Array.isArray(productList), 'La lista de productos no está disponible.');

  } catch (error) {
    assert.fail(error.message)
  };
});