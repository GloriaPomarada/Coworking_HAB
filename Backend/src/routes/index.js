//! -> ÉSTE ES EL ROUTER PROPIAMENTE DICHO.

import express from 'express'; //-> Importo express

//-> Importamos modulos de rutas.
import userRoutes from './userRoutes.js';
import spaceRoutes from './spaceRoutes.js';
import equipmentRoutes from './equipmentRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import incidentRoutes from './incidentRoutes.js';


//-> Creamos router.
const router = express.Router();

//-> Registramos las rutas en el router.
router.use('/users', userRoutes);
router.use('/spaces', spaceRoutes);
router.use('/equipment', equipmentRoutes);
router.use('/categories', categoryRoutes);
router.use('/incidents', incidentRoutes);

export default router;
