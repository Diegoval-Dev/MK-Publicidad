import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Productos Personalizados',
      version: '1.0.0',
      description: 'Documentación de la API de Productos Personalizados',
    },
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              description: 'Identificador único del Producto.',
            },
            name: {
              type: 'string',
              description: 'Nombre del Producto.',
            },
            category: {
              type: 'string',
              description: 'Categoría del Producto.',
            },
            material: {
              type: 'string',
              description: 'Material del Producto.',
              nullable: true,
            },
            description: {
              type: 'string',
              description: 'Descripción del Producto.',
              nullable: true,
            },
            image: {
              type: 'string',
              description: 'URL de la imagen del Producto.',
              nullable: true,
            },
            size: {
              type: 'string',
              description: 'Tamaño del Producto.',
              nullable: true,
            },
            color: {
              type: 'string',
              description: 'Color del Producto.',
              nullable: true,
            },
            technique: {
              type: 'string',
              description: 'Técnica utilizada para el Producto.',
              nullable: true,
            },
          },
        },
        Customer: {
          type: 'object',
          properties: {
            Customer_ID: {
              type: 'integer',
              format: 'int64',
              description: 'Identificador único del Cliente.',
            },
            customer_company: {
              type: 'string',
              description: 'Nombre de la empresa del cliente.',
            },
            customer_email: {
              type: 'string',
              description: 'Correo electrónico del cliente.',
            },
            customer_contact: {
              type: 'string',
              description: 'Número de contacto del cliente.',
            },
            customer_address: {
              type: 'string',
              description: 'Dirección del cliente.',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Asegúrate de que las rutas sean correctas
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

export default swaggerDocs;
