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
  await loadProductsByMaterial("Algodón")
});

Then('debería ver la lista de productos fabricados con ese material', async function () {
  try {
    const productList = await loadProductsByMaterial("Algodón");
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

// Given('que estoy en la página principal', async function () {
//   driver = await new Builder().forBrowser('chrome').build();
//   await driver.get('http://localhost:5173');
// });

// Then('debería ver el componente para realizar búsquedas', async function () {
//   const searchInput = await driver.findElement(By.className('pl-4 border border-black-500 pe-20 py-2 rounded-lg focus:outline-none focus:border-green-500 mx-1'));
//   const isInputDisplayed = await searchInput.isDisplayed();
//   if (!isInputDisplayed) {
//     throw new Error("El cuadro de búsqueda no está presente en la página.");

//   } else {
//     console.log('El cuadro de búsquedas está presente.')
//   };
// });

// Then('debería ver las categorías', async function () {
//   const categoriesHome = await driver.findElement(By.className('flex flex-col items-center'));
//   const isCategoriesDisplayed = await categoriesHome.isDisplayed();
//   if (!isCategoriesDisplayed) {
//     throw new Error("Las categorías no están presentes en la página.");

//   } else {
//     console.log('El menú de categorías está presente.')

//   };
// });