import express from 'express';
import fileUpload from "express-fileupload";
import morgan from 'morgan';
import routes from "./src/routes/index.js";
import errorHandler from './src/middlewares/errorHandler.js';
import corsMiddleware from './src/middlewares/cors.js';
import { PORT, UPLOADS_DIR } from "./env.js";

const app = express();

//!-> REGISTRO DE MIDDLEWARES:
//Middleware CORS.
app.use(corsMiddleware);
//Middleware Morgan-> info de la solicitud.
app.use(morgan('dev')); 
//Middlewares Pareso del body de la petición.
app.use(express.json());//Convierte solicitudes json->objeto y asigna a req.body.
app.use(express.urlencoded({ extended: true }));//Convierte solicitudes formularios.html->objeto y asigna a req.body.
app.use(fileUpload()); //-> carga de archivos con express.
app.use(express.static(UPLOADS_DIR)); //-> directorio donde vamos a guardar los archivos.
 
//!-> registro de directorio rutas.
app.use("/api", routes);


// Middleware manejo de errores
app.use(errorHandler);

// Ponemos el servidor a escuchar en un puerto obtenido de una variable de entorno
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});