import * as incidentsModel from '../../models/incidents/index.js';

const createMessageController = async (req, res, next) => {
    try {
        const { incidenciaId, mensaje } = req.body;
        const { id: authenticatedUserId, role: authenticatedUserRole } = req.user; // Datos del usuario autenticado

        // Obtener información de la reserva asociada a la incidencia
        const bookingInfo = await incidentsModel.getBookingInfo(incidenciaId);

        if (!bookingInfo) {
            return res.status(404).json({ mensaje: 'No se encontró información de reserva para la incidencia proporcionada.' });
        }

        // Asegurarse de que existe un espacio_id válido
        const { usuario_id: bookingUserId, espacio_id: espacioId } = bookingInfo;

        if (!espacioId) {
            return res.status(400).json({ mensaje: 'El espacio_id no está disponible para la reserva asociada.' });
        }

        // Verificar si el usuario autenticado es el propietario de la reserva o un administrador
        if (authenticatedUserId !== bookingUserId && authenticatedUserRole !== 'admin') {
            return res.status(403).json({ mensaje: 'No tiene permiso para crear un mensaje para esta incidencia.' });
        }

        // Crear el mensaje de incidencia utilizando la información de la reserva
        const messageId = await incidentsModel.createMessage(incidenciaId, mensaje, espacioId);

        res.status(201).json({ messageId, mensaje: 'Mensaje de incidencia creado correctamente.' });
        
    } catch (error) {
        console.error('Error al crear mensaje de incidencia:', error);
        next(error);
    }
};


export default createMessageController;