import express from 'express';
import path from 'path';
import morgan from 'morgan';
import routes from "./src/routes/index.js";
import { PORT, UPLOADS_DIR } from './env.js';
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
//Middlewares Pareso del body de la petición.
app.use(express.json());//Convierte solicitudes json->objeto y asigna a req.body.
app.use(express.urlencoded({ extended: true }));//Convierte solicitudes formularios html->objeto y asigna a req.body.


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

