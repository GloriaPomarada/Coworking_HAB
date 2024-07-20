import * as incidentsModel from '../../models/incidents/index.js';
import postMessageSchema from '../../schema/incidents/messageSchema.js';

const createMessageController = async (req, res, next) => {
    try {
        
        console.log('Request body:', req.body);//!-> Log del cuerpo de la solicitud inicial

        // Validar los datos de entrada
        const { error } = postMessageSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ mensaje: error.details[0].message });
        }

        const { incidencia_id, mensaje, espacio_id, reserva_id, usuario_id } = req.body;
        const { id: authenticatedUserId, role: authenticatedUserRole } = req.user; // Datos del usuario autenticado

        
        console.log('Validated values:', { incidencia_id, mensaje, espacio_id, reserva_id, usuario_id });//!-> Log de los datos validados

        // Verificar que los campos no sean undefined
        if ([incidencia_id, mensaje, espacio_id, reserva_id, usuario_id].includes(undefined)) {
            return res.status(400).json({ mensaje: 'Todos los campos son requeridos y deben ser válidos.' });
        }

        // Obtener información de la reserva asociada a la incidencia
        const bookingInfo = await incidentsModel.getBookingInfo(incidencia_id);

        if (!bookingInfo) {
            return res.status(404).json({ mensaje: 'No se encontró información de reserva para la incidencia proporcionada.' });
        }

        // Nos aseguramos de que existe un espacio_id válido
        const { usuario_id: bookingUserId, espacio_id: bookingEspacioId } = bookingInfo;

        if (!bookingEspacioId) {
            return res.status(400).json({ mensaje: 'El espacio_id no está disponible para la reserva asociada.' });
        }

        // Verificamos si el usuario autenticado es el propietario de la reserva o un admin
        if (authenticatedUserId !== bookingUserId && authenticatedUserRole !== 'admin') {
            return res.status(403).json({ mensaje: 'No tiene permiso para crear un mensaje para esta incidencia.' });
        }

        // Crear el mensaje de incidencia utilizando la información de la reserva
        const messageId = await incidentsModel.createMessage(incidencia_id, mensaje, espacio_id, reserva_id, usuario_id);

        res.status(201).send({ 
            status: 'ok', 
            messageId, 
            mensaje: 'Mensaje de incidencia creado correctamente.' 
        });
        
    } catch (err) {
        next(err);
    }
};

export default createMessageController;
