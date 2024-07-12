import express from 'express';
const router = express.Router(); //-> "Minirouter" que gestiona las rutas de las valoraciones.
import * as ratingsController from '../controllers/ratings/index.js';
import * as middleware from '../middlewares/index.js';

router.post('/create', middleware.authenticate, ratingsController.postVote);

export default router;