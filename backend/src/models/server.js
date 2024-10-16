import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { testConnection } from '../database/config.js';
import adminRoutes from '../api/routes/admin.routes.js';
import userRoutes from '../api/routes/user.routes.js';
import quoteRoutes from '../api/routes/api.routes.js'; // Importa las rutas de cotización
//import corsOprions from '../config/config.js';

import swaggerDocs from '../api/swagger.js'


class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath='/admin'
        this.userPath='/user',
        this.apiPath='/api',
        this.middlewares();
        this.routes();
        
    }
    async dbConnection(){
        await testConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
    }

    routes(){
        this.app.use(this.adminPath, adminRoutes);
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.apiPath, quoteRoutes); // Registra las rutas de cotización
        swaggerDocs(this.app) 
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`);
        });
    }


}

export default Server;