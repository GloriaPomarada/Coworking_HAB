import * as bookingsModel from '../../models/bookings/index.js';

const getBookingsController = async (req, res) => {
    try {
        const bookings = await bookingsModel.getBookings();
        res.json(bookings);
        
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
};

export default getBookingsController;