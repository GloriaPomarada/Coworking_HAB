import * as reservarModel from '../../models/bookings/index.js';
import confirmBookingSchema from '../../schema/bookings/confirmBookingSchema.js';
import sendMailUtil from '../../utils/sendMailUtils.js';



const reservationController = async (req, res, next ) => {
    try {
        const reservaID = req.params.id
        const { estado } = req.body;

        // Validar el cuerpo de la solicitud usando Joi
        const { error } = confirmBookingSchema.validate({ estado });

        // Si hay un error en la validación, devolver un error 400 con el mensaje de error
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const res1 = await reservarModel.getUsername(reservaID);
        const res2 = await reservarModel.getUserEmail(reservaID);

        const username = res1[0].username
        const email = res2[0].email
    
        await reservarModel.postBookings(reservaID, estado);

    
        const emailSubject = 'Confirmación de Reserva';
        const emailBody = `
            Hola ${username}. 
            El estado de tu reserva ha camiado a ${estado}.`;
    
       await sendMailUtil(email, emailSubject, emailBody);
        
        res.send({
            status: 'ok',
            message: 'Estado de la reserva cambiada , revisa tu correo'

        })
        
    } catch (error) {
        next(error);

    }
}

export default reservationController;


