import express from 'express';
const router = express.Router();//-> "Minirouter" que gestiona las rutas de los espacios.
import * as spaceController from '../controllers/spaces/index.js';
import * as middleware from '../middleware/index.js';


//*-> RUTAS PÚBLICAS.
router.get('/', spaceController.getEntries); //-> .com/espacios