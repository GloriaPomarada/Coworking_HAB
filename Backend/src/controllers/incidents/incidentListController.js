import * as incidentsModel from '../../models/incidents/index.js';

const getIncidentsController = async (req, res) => {
    try {
        const incidents = await incidentsModel.getIncidences();
        res.json(incidents);
        
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
};

export default getIncidentsController;