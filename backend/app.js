import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a MK Platform Backend');
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});