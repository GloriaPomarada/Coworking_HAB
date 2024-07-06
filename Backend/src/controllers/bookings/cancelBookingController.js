import * as bookingModel from '../../models/bookings/index.js';

const cancelBookingController = async (req, res, next) => {
    const { usuario_id, reserva_id } = req.body;

    if (!usuario_id || !reserva_id) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        await bookingModel.cancelModel(usuario_id, reserva_id);

        res.status(200).json({
            message: 'Reserva cancelada con éxito!'
        });
    } catch (error) {
        next(error);
    }
};

export default cancelBookingController;