import * as incidentModel  from '../../models/incidents/index.js';  // Importa el modelo de incidencia

const createIncident = async (req, res) => {
    const { espacio_id, reserva_id, usuario_id, categoria_incidencia_id, titulo } = req.body;

    try {
        // Llama al modelo para crear la incidencia en la base de datos
        const incidentId = await incidentModel.newIncident(espacio_id, reserva_id, usuario_id, categoria_incidencia_id, titulo);

        res.status(201).json({
            id: incidentId,
            mensaje: 'Incidencia creada exitosamente'
        });

    } catch (error) {
        console.error('Error al crear la incidencia:', error);
        res.status(500).json({ mensaje: 'Error al crear la incidencia' });
    }
};


export default createIncident;