import { addHours, isBefore } from 'date-fns';
import newBookingSchema from '../../schema/bookings/newBookingSchema.js';
import * as bookingModel from '../../models/bookings/index.js';

const postBookingController = async (req, res, next) => {
    const {
        espacio_id,
        tipo,
        fecha_inicio,
        fecha_fin,
        observaciones,
    } = req.body;

    const usuario_id = req.user.id;  // Obtener el usuario autenticado

    const { error } = newBookingSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Convertir la fecha de inicio de la reserva a objeto Date.
    const fechaInicioReserva = new Date(fecha_inicio);

    // Obtener la fecha y hora actuales.
    const ahora = new Date();

    // Calcular la fecha y hora con al menos 24 horas de antelación.
    const fechaMinima = addHours(ahora, 24);

    // Verificar si la fecha de inicio de la reserva es posterior a la fecha mínima.
    if (isBefore(fechaInicioReserva, fechaMinima)) {
        return res.status(400).json({ message: 'Debe reservar con al menos 24 horas de antelación' });
    }

    try {
        // Verificar si ya existe una reserva para el espacio en el intervalo de fechas especificado.
        const existeReserva = await bookingModel.checkExistingReservation(espacio_id, fecha_inicio, fecha_fin);
        if (existeReserva) {
            return res.status(400).json({ message: 'Ya existe una reserva para este espacio en el mismo intervalo de fechas' });
        }

        // Crear la nueva reserva si pasa todas las validaciones
        const newBooking = await bookingModel.newBooking(
            usuario_id,
            espacio_id,
            tipo,
            fecha_inicio,
            fecha_fin,
            observaciones
        );

        res.status(201).json({
            status: 'ok',
            data: {
                reserva: newBooking,
                mensaje: 'Reserva creada con éxito!',
            },
        });
    } catch (error) {
        next(error);
    }
};

export default postBookingController;
