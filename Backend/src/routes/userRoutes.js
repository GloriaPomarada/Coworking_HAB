import express from 'express';
const router = express.Router(); //-> "Minirouter" que gestiona las rutas de los usuarios.
import * as usuarioController from '../controllers/usuarios/index.js';
import * as middleware from '../middleware/index.js';

//* -> RUTAS PUBLICAS


//*-> RUTAS PRIVADAS