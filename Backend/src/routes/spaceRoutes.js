import express from 'express';
const router = express.Router(); //-> "Minirouter" que gestiona las rutas de los espacios.
import * as spaceController from '../controllers/spaces/index.js';
import * as middleware from '../middlewares/index.js';

router.get('/filters', spaceController.filter); //-> .com/api/filtros
router.get('/:id', spaceController.getSpace); //-> .com/api/espacios/:espacioId
router.get('/', spaceController.getSpaces); //.com/api/spaces

router.post(
    '/',
    middleware.authenticate,
    middleware.isAdmin,
    spaceController.createSpace
); //-> .com/crear-espacio
router.put(
    '/:id',
    middleware.authenticate,
    middleware.isAdmin,
    spaceController.updateSpace
); //-> .com/actualizar-espacio/:espacioId
router.post(
    '/:spaceId/photos',
    middleware.authenticate,
    middleware.verifyUser,
    middleware.isAdmin,
    spaceController.addPhoto
); //->.com/api/spaces/:spaceId/photos
router.delete(
    '/:spaceId/photos/:photoId',
    middleware.authenticate,
    middleware.verifyUser,
    middleware.isAdmin,
    spaceController.deletePhoto
); //->.com/api/spaces/:spaceId/photos/:photoId

export default router;
