import express from 'express';
const router = express.Router();//-> "Minirouter" que gestiona las rutas de los incidencias.
import * as bookingController from '../controllers/bookings/index.js';
import * as middleware from '../middlewares/index.js';

//.com/api/bookings
router.get ('/', bookingController.getBookings); 
//.com/api/bookings/create
router.post('/create', middleware.authenticate, middleware.verifyUser, bookingController.postBooking);
//.com/api/bookings/cancel
router.put('/cancel', middleware.authenticate, middleware.verifyUser, bookingController.cancelBooking);


export default router;