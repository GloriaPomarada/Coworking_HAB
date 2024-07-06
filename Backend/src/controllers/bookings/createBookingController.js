import * as bookingModel from '../../models/bookings/index.js';

const postBookingController = async (req, res, next) => {
    const {
        usuario_id,
        espacio_id,
        tipo,
        fecha_inicio,
        fecha_fin,
        observaciones,
    } = req.body;

    if (
        !usuario_id ||
        !espacio_id ||
        !tipo ||
        !fecha_inicio ||
        !fecha_fin ||
        !observaciones
    )
        return res
            .status(400)
            .json({ message: 'Todos los campos son requeridos' });

    const newBooking = await bookingModel.newBooking(
        usuario_id,
        espacio_id,
        tipo,
        fecha_inicio,
        fecha_fin,
        observaciones
    );

    try {
        res.status(201).json({
            message: 'Reserva creada con éxito! ',
            newBooking,
        });
    } catch (error) {
        next(error);
    }
};

export default postBookingController;