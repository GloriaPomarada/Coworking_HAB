import express from 'express';
const router = express.Router();//-> "Minirouter" que gestiona las rutas de los equipamientos.
import * as categoryController from '../controllers/categories/index.js';

router.get('/', categoryController.getCategories); //-> .com/equipamientos

export default router;