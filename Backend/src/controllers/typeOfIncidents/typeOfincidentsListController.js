import * as typeOfIncidentsModel from '../../models/typeOfIncidents/index.js';

const getTypeOfIncidentsController = async (req, res) => {
    try {
        const typeOfIncidents = await typeOfIncidentsModel.getTypeOfIncidents();
        res.json(typeOfIncidents);
        
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
};

export default getTypeOfIncidentsController;
