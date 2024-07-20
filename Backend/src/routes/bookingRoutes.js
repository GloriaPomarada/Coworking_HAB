import express from 'express';
const router = express.Router();//-> "Minirouter" que gestiona las rutas de los reservas.
import * as bookingController from '../controllers/bookings/index.js';
import * as middleware from '../middlewares/index.js';
import * as reservationController from '../controllers/bookings/index.js';
import isAdmin from '../middlewares/isAdmin.js';


router.get ('/', middleware.authenticate,  bookingController.getBookings); //.com/api/bookings/mis_reservas
router.get ('/details/:reservaId', middleware.authenticate, bookingController.bookingDetail); //.com/api/bookings/details/:reservaId
router.post ('/create', middleware.authenticate, middleware.verifyUser, bookingController.postBooking);//.com/api/bookings/create
router.put ('/cancel', middleware.authenticate, middleware.verifyUser, bookingController.cancelBooking);//.com/api/bookings/cancel
router.post ('/reservation/:id/status', middleware.authenticate, isAdmin, reservationController.postBookings); //.com/api/bookings/reservation/:id/status

export default router;