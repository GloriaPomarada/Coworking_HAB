import express from 'express';
import path from 'path';
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

// Servidor port: 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
