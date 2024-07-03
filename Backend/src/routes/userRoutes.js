import express from 'express';
const router = express.Router(); //-> "Minirouter" que gestiona las rutas de los usuarios.
import * as userController from '../controllers/users/index.js';



//* -> RUTAS PUBLICAS
router.post('/register', userController.register); // .com/api/users/register

//*-> RUTAS PRIVADAS

export default router;
