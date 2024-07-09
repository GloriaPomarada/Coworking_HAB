import * as incidencesModel from '../../models/incidents/index.js';

const getIncidentsController = async (req, res) => {
    const filters = req.query;

    try {
        const findIncidences = await incidencesModel.getIncidences(filters);
        res.json(findIncidences);
        
    } catch (error) {
        console.error('Error al filtrar las incidencias:', error);
        res.status(500).json({ mensaje: 'Hubo un error al filtrar las incidencias' });
    }
};

export default getIncidentsController;