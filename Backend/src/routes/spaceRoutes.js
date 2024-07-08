import express from 'express';
const router = express.Router(); //-> "Minirouter" que gestiona las rutas de los espacios.
import * as spaceController from '../controllers/spaces/index.js';
import authenticateMiddleware from '../middlewares/authenticateMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';

router.get('/', spaceController.getFilterSpace);//.com/api/spaces?filter=param
router.post('/', authenticateMiddleware, isAdmin, spaceController.createSpace); //-> .com/crear-espacio

export default router;
