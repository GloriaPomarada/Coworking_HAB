import * as bookingModel from '../../models/bookings/index.js';
import { addHours, isBefore } from 'date-fns';
import cancelBookingSchema from '../../schema/bookings/cancelBookingSchema.js';

const cancelBookingController = async (req, res, next) => {
    const { usuario_id, reserva_id } = req.body;

   // Validar el cuerpo de la solicitud usando Joi
   const { error } = cancelBookingSchema.validate(req.body);

   // Si hay un error en la validación, devolver un error 400 con el mensaje de error
   if (error) {
       return res.status(400).json({ message: error.details[0].message });
   }

    try {
        // Obtener la fecha de inicio de la reserva
        const fechaInicio = await bookingModel.getBookingStartDate(reserva_id);

        // Validar que la cancelación se hace con al menos 24 horas de antelación
        const currentDate = new Date();
        const startDate = new Date(fechaInicio);

        if (isBefore(startDate, addHours(currentDate, 24))) {
            return res.status(400).json({ message: 'Lo sentimos! No está permitido cancelar una reserva con menos de 24 horas de antelación.' });
        }

        await bookingModel.cancelBookingModel(usuario_id, reserva_id);

        res.send({
            status: 'ok',
            message: 'Reserva cancelada con éxito!'
        });
    } catch (error) {
        next(error);
    }
};

export default cancelBookingController;
