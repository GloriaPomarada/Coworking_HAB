import { filteredIncidences } from '../../models/incidents/index.js';

const getIncidentsController = async (req, res) => {
    const userId = req.user.id;
    const userRole = req.user.role; 

    try {
        // Llama al modelo sin filtros adicionales
        const findIncidences = await filteredIncidences({}, userId, userRole);
        res.json(findIncidences);
    } catch (error) {
        console.error('Error al obtener las incidencias:', error);
        res.status(500).json({ mensaje: 'Hubo un error al obtener las incidencias' });
    }
};

export default getIncidentsController;
