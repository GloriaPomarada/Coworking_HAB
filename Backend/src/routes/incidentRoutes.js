import express from 'express';
const router = express.Router(); //-> "Minirouter" que gestiona las rutas de los incidencias.
import * as incidentController from '../controllers/incidents/index.js';
import * as middleware from '../middlewares/index.js';

router.get('/', middleware.authenticate, middleware.isAdmin, incidentController.getIncidents); // .com/incidencias con filtro

router.post('/create', middleware.authenticate, incidentController.createIncident)

router.post('/postmessage',middleware.authenticate, incidentController.postMessage); // .com/incidencias/nnewMessage

export default router;