import * as bookingsModel from '../../models/bookings/index.js';

const getBookingsController = async (req, res, next) => {
    try {
        const filters = req.query; 
        const { id: userId, role: userRole } = req.user; 
        const reservas = await bookingsModel.getBookings(filters, userId, userRole);

        res.send({
            status: 'ok',
            data: reservas,
        }); 
        
    } catch (err) {
        next(err);
    }
};

export default getBookingsController