import express from "express";
import productController from '../controllers/productController.js';
import { Resend } from "resend";

const router = express.Router();
const resend = new Resend("re_W7fQeeRt_Fx4JciPu3LhhBRU843mLEPmR");

// Ruta unificada para obtener productos con cualquier combinación de filtros
router.get('/products', productController.getAllProducts);

const name = "Cliente";
const quotationDetails = [
  {
    product: "Suéter Negro",
    description: "Suéter de algodón",
    quantity: 10,
    unitPrice: 80.00,
    total: 800.00,
    image: "https://drs.com.gt/wp-content/uploads/2023/09/mapf1-sueter-negro2.png"
  },
  {
    product: "Suéter Blanco",
    description: "Suéter de algodón",
    quantity: 10,
    unitPrice: 80.00,
    total: 800.00,
    image: "https://drs.com.gt/wp-content/uploads/2023/09/mapf1-sueter-negro2.png"
  }
];
const total = quotationDetails.reduce((sum, item) => sum + item.total, 0);

const emailTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
  <title>Confirmación de Cotización</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .header {
    background-color: #f1f1f1;
    padding-right: 5%;
    width: 100%;
    text-align: right;
    align-items: center;
    justify-content: space-between;
    font-size: x-large;
    display: flex;
  }
  .row {
    display: -webkit-flex;
    display: flex;
    text-align: center;
    justify-content: space-evenly;
    align-items: center;
    border: 2px solid #aaa;
  }
  .column {
    padding: 0.2em;
    border: #aaa;
    text-align: left;
  }
  .column.side {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    justify-content: space-evenly;
  }
  .column.sides {
    -webkit-flex: 2;
    -ms-flex: 2;
    flex: 2;
    justify-content: space-evenly;
  }
  .column.middle {
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 3;
    justify-content: space-evenly;
  }
  .footer {
    background-color: #d1d1d1;
    padding: 10px;
    justify-content: end;
    display: flex;
    padding-right: 10%;
  }
  img {
    width: 100%;
    max-width: 150px;
    height: auto;
  }
  </style>
  </head>
  <body>
    <p>Aquí está la confirmación de su cotización con los productos que ordenó.</p>
    <div class="header">
      <img heigth="100%" src="https://i.postimg.cc/DZZv68Bs/logo.png" alt="Logo de MK">
      <h2>Confirmación de Cotización</h2>
    </div>

    <div class="row">
      <div class="column side">
      </div>
      <div class="column sides">
      </div>
    </div>

    <div class="row" style="background-color: #f1f1f1;">
      <div class="column side" style="border-right: 2px solid #aaa; text-align: left">
        <ul>
          <li>NIT: 123456789</li>
          <li>Empresa: Y tal</li>
          <li>Contacto: Jorge Pérez</li>
          <li>Teléfono: 123456789</li>
          <li>Dirección: Parque Z1</li>
          <li>Correo: ytal@gmail.com</li>
        </ul>
      </div>
      <div class="column sides">
        <ul>
          <li>De: Marielos Monterroso</li>
          <li>Puesto: Ejecutiva de Proyectos</li>
          <li>Correo: ventas@mkpublicidadgt.com</li>
          <li>Cel: (502) 5524-5975</li>
          <li>Oficina: (502) 2293-2986</li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="column side">
        <h3>Producto</h3>
      </div>
      <div class="column sides">
        <h3>Descripción</h3>
      </div>
      <div class="column middle">
        <h3>Cantidad</h3>
      </div>
      <div class="column sides">
        <h3>Precio unitario</h3>
      </div>
      <div class="column side">
        <h3>Total</h3>
      </div>
    </div>

    ${quotationDetails.map(item => `
    <div class="row" style="background-color: #f1f1f1;">
      <div class="column side">
        <img heigth="50%" src=${item.image} alt="Imagen del producto">
        <p>${item.product}</p>
      </div>
      <div class="column sides">
        <p>${item.description}</p>
      </div>
      <div class="column middle">
        <p>${item.quantity}</p>
      </div>
      <div class="column sides">
        <p>Q${item.unitPrice.toFixed(2)}</p>
      </div>
      <div class="column side">
        Q${item.total.toFixed(2)}
      </div>
    </div>
    `).join('')}

    <div class="footer">
      <h4 style="margin-right: 5em;">TOTAL</h4>
      <h4>Q${total.toFixed(2)}</h4>
    </div>

  </body>
  </html>
`;

// Ruta para enviar correos de confirmación al usuario. De momento solo puede enviar correos a mi dirección
router.get("/send-email", async (req, res) => {
  const { receiver } = req.params;
  const { data, error } = await resend.emails.send({
    from: "MK-Publicidad <onboarding@resend.dev>",
    to: ['pen22217@uvg.edu.gt'],
    subject: "Confirmación de cotización",
    html: emailTemplate,
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});

// Ruta para obtener los filtros posibles por categoria
router.get('/filters/:category', productController.getFilterOptionsByCategory);
router.get('/categories', productController.getAllCategories);

export default router;
