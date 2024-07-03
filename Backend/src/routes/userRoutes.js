import express from 'express';
const router = express.Router(); //-> "Minirouter" que gestiona las rutas de los usuarios.
import * as userController from '../controllers/users/index.js';



//* -> RUTAS PUBLICAS
router.post('/register', userController.register); // .com/api/users/register
router.put('/activate/:registrationCode', userController.validate); // .com/api/users/activate
router.post('/login', userController.login); // .com/api/users/login
router.put('/password/reset', userController.passwordReset); // .com/api/users/password/reset


//*-> RUTAS PRIVADAS

export default router;
