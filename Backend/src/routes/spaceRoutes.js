import express from 'express';
const router = express.Router(); //-> "Minirouter" que gestiona las rutas de los espacios.
import * as spaceController from '../controllers/spaces/index.js';
import authenticateMiddleware from '../middlewares/authenticateMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';

router.get('/', spaceController.getFilterSpace); //.com/api/spaces?filter=param
router.get('/:id', spaceController.getSpace); //-> .com/api/espacios/:espacioId
router.post('/', authenticateMiddleware, isAdmin, spaceController.createSpace); //-> .com/crear-espacio
router.put(
    '/:id',
    authenticateMiddleware,
    isAdmin,
    spaceController.updateSpace
); //-> .com/actualizar-espacio/:espacioId

export default router;
