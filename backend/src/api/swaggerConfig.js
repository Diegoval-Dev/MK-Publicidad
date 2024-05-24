// swaggerConfig.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

const router = Router();

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Productos Personalizados',
        version: '1.0.0',
        description: 'Documentación de la API de Productos Personalizados'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor local'
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js', './controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;