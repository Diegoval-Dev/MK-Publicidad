import express from "express";
import productController from '../controllers/productController.js';
import { Resend } from "resend";

const router = express.Router();
const resend = new Resend("re_W7fQeeRt_Fx4JciPu3LhhBRU843mLEPmR");

// Ruta unificada para obtener productos con cualquier combinación de filtros
router.get('/products', productController.getAllProducts);

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
  justify-content: center;
  align-items: center;
  border: 2px solid #aaa;
}

.column {
  padding: 0.2em;
  border: #aaa;
}

.column.side {
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.column.sides {
  -webkit-flex: 2;
  -ms-flex: 2;
  flex: 2;
}

.column.middle {
  -webkit-flex: 3;
  -ms-flex: 3;
  flex: 3;
}

.footer {
  background-color: #d1d1d1;
  padding: 10px;
  justify-content: end;
  display: flex;
  padding-right: 2%;
}

@media (max-width: 600px) {
  .row {
    -webkit-flex-direction: row;
    flex-direction: column;
  }
}
</style>
</head>
<body>
  <div class="header">
    <img width="250em" src="../../assets/imgs/logo.svg" alt="Logo de MK">
    <h2>Confirmación de Cotización</h2>
  </div>

  <div class="row">
    <div class="column side" style="background-color:#aaa;">
    </div>
    <div class="column sides" style="background-color:#aaa;">
    </div>
  </div>

  <div class="row" style="background-color: #f1f1f1; text-align: left;">
    <div class="column side" style="border-right: 2px solid #aaa;">
      <ul>
        <li>NIT:</li>
        <li>Empresa:</li>
        <li>Contacto:</li>
        <li>Teléfono:</li>
        <li>Dirección:</li>
        <li>Correo:</li>
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
    <div class="column side" style="background-color:#aaa;">
      <h3>Producto</h3>
    </div>
    <div class="column sides" style="background-color:#aaa;">
      <h3>Descripción</h3>
    </div>
    <div class="column middle" style="background-color:#aaa;">
      <h3>Cantidad</h3>
    </div>
    <div class="column sides" style="background-color:#aaa;">
      <h3>Precio unitario</h3>
    </div>
    <div class="column side" style="background-color:#aaa;">
      <h3>Total</h3>
    </div>
  </div>

  <div class="row" style="background-color: #f1f1f1;">
    <div class="column side">
      <img width="100%" src="../../assets/imgs/sueter_prueba.png" alt="Imagen del producto">
      <p>Suéter Negro</p>
    </div>
    <div class="column sides">
      <p>Suéter de algodón</p>
    </div>
    <div class="column middle">
      <p>10</p>
    </div>
    <div class="column sides">
      <p>Q80.00</p>
    </div>
    <div class="column side">
      Q800.00
    </div>
  </div>

  <div class="footer">
    <h4 style="margin-right: 5em;">TOTAL</h4>
    <h4>Q800.00</h4>
  </div>

</body>
</html>
`

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
