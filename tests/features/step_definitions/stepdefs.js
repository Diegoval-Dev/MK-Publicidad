const assert = require('assert');
const { Given, Then, When, After } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const { error } = require('console');

let driver;

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

const loadProductsByMaterial = async (material) => {
  const apiURL = `http://localhost:3000/user/products?material=${material}`;
  
  try {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Productos por material");
      console.log(data);
      return Array.from(data);

    } else {
      throw new Error("Ocurrió un error al obtener los productos.")

    };
    
  } catch (error) {
    console.error(error);
    
  };
};

async function loadProductsByCategory(category) {
  const apiURL = `http://localhost:3000/user/products?category=${category}`;
  
  try {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Productos por categoría");
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
    assert.fail(error.message);
  };
});

When('ingreso el material del producto', async function () {
  await loadProductsByMaterial("1")
});

Then('debería ver la lista de productos fabricados con ese material', async function () {
  try {
    const productList = await loadProductsByMaterial("1");
    assert.ok(Array.isArray(productList), 'La lista de productos no está disponible.')

  } catch (error) {
    assert.fail(error.message)
  }
});

When('ingreso la categoría del producto', async function () {
  await loadProductsByCategory("Pachones");
});

Then('debería ver la lista de productos pertenecientes a esa categoría', async function () {
  try {
    const productList = await loadProductsByCategory("Pachones");
    assert.ok(Array.isArray(productList), 'La lista de productos no está disponible.')
    
  } catch (error) {
    assert.fail(error.message)
  }
});