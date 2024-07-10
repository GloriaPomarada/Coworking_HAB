import express from 'express';
const router = express.Router();//-> "Minirouter" que gestiona las rutas de los incidencias.
import * as bookingController from '../controllers/bookings/index.js';
import * as middleware from '../middlewares/index.js';
import * as reservationController from '../controllers/bookings/index.js';
import authUserController from '../middlewares/authUser.js';
import isAdmin from '../middlewares/isAdmin.js';


router.get ('/', middleware.authenticate,  bookingController.getBookings); //.com/api/bookings
router.post('/create', middleware.authenticate, middleware.verifyUser, bookingController.postBooking);//.com/api/bookings/create
router.put('/cancel', middleware.authenticate, middleware.verifyUser, bookingController.cancelBooking);//.com/api/bookings/cancel
router.post('/reservation/:id/status', authUserController, isAdmin, reservationController.postBookings); //.com/api/bookings/reservation/:id/status

export default router;