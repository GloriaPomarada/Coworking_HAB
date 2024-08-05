import * as incidentModel  from '../../models/incidents/index.js'; 
import newIncidentSchema from '../../schema/incidents/newIncidentSchema.js';

const createIncident = async (req, res, next) => {
    try {
        const { error } = newIncidentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ mensaje: error.details[0].message });
        }

        const { espacio_id, reserva_id, usuario_id, categoria_incidencia_id, titulo } = req.body;

        const incidentId = await incidentModel.newIncident(espacio_id, reserva_id, usuario_id, categoria_incidencia_id, titulo);

        res.status(201).send({
            status: 'ok',
            id: incidentId,
            mensaje: 'Incidencia creada exitosamente'
        });

    } catch (err) {
        next(err);
    }
};

export default createIncident;