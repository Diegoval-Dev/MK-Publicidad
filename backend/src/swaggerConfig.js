// swaggerConfig.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

const router = Router();

// Configuración de Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Productos Personalizados',
        version: '1.0.0',
        description: 'Documentación de la API de Productos Personalizados'
    },
    servers: [
        {
            url: 'http://localhost:3000', // Cambia esto a la URL de tu servidor
            description: 'Servidor local'
        }
    ]
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js', './controllers/*.js', './models/*.js'], // Asegúrate de que las rutas sean correctas
};

const swaggerSpec = swaggerJSDoc(options);

// Ruta de Swagger UI
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
