import express from 'express';
const router = express.Router();//-> "Minirouter" que gestiona las rutas de los espacios.
import * as typeOfIncidentsListController from '../controllers/typeOfIncidents/index.js';


//*-> RUTAS PÚBLICAS.
router.get('/', typeOfIncidentsListController.getTypeOfIncidents); //-> .com/api/incidentsCategories



export default router;