import * as reservarModel from '../../models/bookings/postReservationModel.js'
import sendMailUtil from '../../utils/sendMailUtils.js';


const reservationController = async (req, res, next ) => {
    try {
        const { username, email, password, estadoRerserva } = req.body;
        const emailSubject = 'Confirmación de Reserva';
        const emailbody = `
            Hola ${username}. 
            El estado de tu reserva ha camiado a ${estadoRerserva}.`;
        await reservarModel.updateReservaEstado(id, estado);

        await sendMailUtil(email, emailSubject, emailbody);

        res.send({
            status: 'ok',
            message: 'Estado de la reserva cambiada , revisa tu correo'

        })



        
    } catch (error) {
        next(error);

    }
}

export default reservationController;