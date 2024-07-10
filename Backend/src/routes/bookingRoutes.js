import express from 'express';
const router = express.Router();//-> "Minirouter" que gestiona las rutas de los incidencias.
import * as bookingController from '../controllers/bookings/index.js';
import * as middleware from '../middlewares/index.js';


router.get ('/', middleware.authenticate,  bookingController.getBookings); //.com/api/bookings
router.post('/create', middleware.authenticate, middleware.verifyUser, bookingController.postBooking);//.com/api/bookings/create
router.put('/cancel', middleware.authenticate, middleware.verifyUser, bookingController.cancelBooking);//.com/api/bookings/cancel

export default router;