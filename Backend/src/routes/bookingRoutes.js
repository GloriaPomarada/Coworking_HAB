import express from 'express';
const router = express.Router();//-> "Minirouter" que gestiona las rutas de los incidencias.
import * as bookingController from '../controllers/bookings/index.js';


//*-> RUTAS PÚBLICAS.
router.get('/', bookingController.getBookings); //-> .com/reservas




export default router;