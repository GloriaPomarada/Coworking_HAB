import * as incidentsModel from '../../models/incidents/index.js';
import postMessageSchema from '../../schema/incidents/messageSchema.js';

const createMessageController = async (req, res, next) => {
    try {
        const { error } = postMessageSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ mensaje: error.details[0].message });
        }

        const { incidencia_id, mensaje } = req.body;
        const { id: authenticatedUserId, role: authenticatedUserRole } = req.user;

        // Verificar que los campos no sean undefined.
        if ([incidencia_id, mensaje].includes(undefined)) {
            return res.status(400).json({ mensaje: 'Todos los campos son requeridos y deben ser válidos.' });
        }

        const incidenceInfo = await incidentsModel.getIncidenceInfo(incidencia_id);

        if (!incidenceInfo) {
            return res.status(404).json({ mensaje: 'No se encontró información para la incidencia proporcionada.' });
        }

        const { espacio_id, reserva_id, usuario_id } = incidenceInfo;

        if (authenticatedUserId !== usuario_id && authenticatedUserRole !== 'admin') {
            return res.status(403).json({ mensaje: 'No tiene permiso para crear un mensaje para esta incidencia.' });
        }

        const messageId = await incidentsModel.createMessage(incidencia_id, mensaje, espacio_id, reserva_id, authenticatedUserId);

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
