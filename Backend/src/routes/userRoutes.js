import express from 'express';
const router = express.Router(); //-> "Minirouter" que gestiona las rutas de los usuarios.
import * as userController from '../controllers/users/index.js';
import recoverPassController from '../controllers/users/recoverPassController.js';

//* -> RUTAS PUBLICAS
router.post('/register', userController.register); // .com/api/users/register
router.post('/login', userController.login); // .com/api/users/login
router.post('/users/password/recover', recoverPassController);

//*-> RUTAS PRIVADAS

export default router;
