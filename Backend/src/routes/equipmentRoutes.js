import express from 'express';
const router = express.Router();//-> "Minirouter" que gestiona las rutas de los equipamientos.
import * as equipmentController from '../controllers/equipment/index.js';


//*-> RUTAS PÚBLICAS.
router.get('/', equipmentController.getEquipment); //-> .com/equipamientos




export default router;