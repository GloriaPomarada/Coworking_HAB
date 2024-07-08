import * as spaceModel from '../../models/spaces/index.js';


const getFilterSpace = async (req, res) => {
    const filters = req.query;

    try {
        const findSpaces = await spaceModel.filteredSpaces(filters);
        res.json(findSpaces);
        
    } catch (error) {
        console.error('Error al filtrar espacios:', error);
        res.status(500).json({ mensaje: 'Hubo un error al filtrar los espacios' });
    }
};


export default getFilterSpace;