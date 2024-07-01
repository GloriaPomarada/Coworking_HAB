import * as equipmentModel from '../../models/equipment/index.js';

const getEquipmentController = async (req, res) => {
    try {
        const equipment = await equipmentModel.getEquipment();
        res.json(equipment);

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
};

export default getEquipmentController;
