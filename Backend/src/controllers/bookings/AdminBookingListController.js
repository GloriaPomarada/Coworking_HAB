import { getPendingBookings } from '../../models/bookings/index.js';

const getPendingBookingsController = async (req, res, next) => {
    try {
        const reservas = await getPendingBookings();

        res.send({
            status: 'ok',
            data: reservas,
        });
    } catch (err) {
        next(err);
    }
};

export default getPendingBookingsController;