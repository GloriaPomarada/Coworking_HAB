import express from 'express';
const router = express.Router(); //-> "Minirouter" que gestiona las rutas de los usuarios.
import * as userController from '../controllers/users/index.js';
import * as middleware from '../middlewares/index.js';


//* -> RUTAS PUBLICAS
router.post('/register', userController.register); // .com/api/users/register
router.put('/activate/:registrationCode', userController.validate); // .com/api/users/activate
router.post('/login', userController.login); // .com/api/users/login
router.post('/password/recover', userController.passwordRecover); // .com/api/user/password/recover
router.put('/password/reset', userController.passwordReset); // .com/api/users/password/reset
router.get('/profile/:userId', middleware.verifyUser, userController.publicProfile); //.com/api/users/profile/:id

//*-> RUTAS PRIVADAS
router.get('/', middleware.authenticate, middleware.isAdmin, userController.getUsers) //.com/api/users
router.get('/profile', middleware.authenticate, middleware.verifyUser, userController.getUserById); //.com/api/users/profile (miPerfil)
router.post('/password/update', middleware.authenticate, middleware.verifyUser, userController.updatePassword) //.com/api/users/password/update

export default router;