import express from 'express';
import cors from 'cors';
import path from 'path';
//import corsOprions from '../config/config.js';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath='/admin'
        this.userPath='/user'
        this.routes();
        this.middlewares();
    }

    middlewares(){
        // CORS
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.users, require('../routes/users'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`);
        });
    }
}