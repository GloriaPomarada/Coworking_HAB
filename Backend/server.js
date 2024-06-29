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

//Endpoint de reservas.js //!NO SÉ SI ESTO VA AQUÍ, HELP!!!!!!!!
const coworkingReservas = require('./coworkingReservas');
app.use('/api/coworking', coworkingReservas);

// passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Configurar la estrategia de autenticación local
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Aquí debes verificar si las credenciales del usuario son válidas
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

// Almacenar y recuperar el usuario de forma eficiente durante el proceso de autetificación
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
