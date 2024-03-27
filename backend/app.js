import 'dotenv/config';
import Server from './src/models/server.js';

const server = new Server();

try {
    await server.dbConnection();
    server.listen();
} catch (error) {
    console.log(error);
    process.exit(1);
}



