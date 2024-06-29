import express from 'express';
import path from 'path';
import morgan from 'morgan';
import routes from "./src/routes/index.js";
import { PORT } from './env.js';
import errorHandler from './src/middlewares/errorHandler.js';
import corsMiddleware from './src/middlewares/cors.js';

const app = express();

// Ruta raíz de express
app.get('/', (req, res) => {
    res.send('Hello');
});


//!-> REGISTRO DE MIDDLEWARES:
//Middleware CORS
app.use(corsMiddleware);
//Middleware Morgan-> info de la solicitud.
app.use(morgan('dev')); 
//Middleware convierte solicitudes json->objeto y los asigna a req.body.
app.use(express.json());
//Middleware convierte solicitudes formularios html->objeto y losasigna a req.body.
app.use(express.urlencoded({ extended: true })); 


//!-> registro de directorio rutas.
app.use("/api", routes);



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