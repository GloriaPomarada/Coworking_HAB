import express from 'express';
import path from 'path';
import { PORT } from './env.js';
import errorHandler from './src/middlewares/errorHandler.js';
import corsMiddleware from './src/middlewares/cors.js';

const app = express();
// Ruta raíz de express
app.get('/', (req, res) => {
    res.send('Hello');
});

// Middleware CORS
app.use(corsMiddleware);

// Middleware para manejar errores 404
app.use((req, res, next) => {
    const error = new Error('No encontrado');
    error.status = 404;
    next(error);
});

// Middleware manejo de errores
app.use(errorHandler);

// Ponemos el servidor a escuchar en un puerto obtenido de una variable de entorno
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
