import * as bookingsModel from '../../models/bookings/index.js';

const getBookingsController = async (req, res) => {

    try {
        const filters = req.query; 
        const { id: userId, role: userRole } = req.user; 
        const reservas = await bookingsModel.getBookings(filters, userId, userRole);
        res.json(reservas);

    } catch (error) {
        console.error('Error al filtrar usuarios:', error);
        res.status(500).json({ mensaje: 'Hubo un error al filtrar las Reservas' });
    }
};

export default getBookingsController;
