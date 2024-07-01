import pool from '../../config/connection.js';

const selectEquipmentModel = async () => {
    const [equipment] = await pool.query('SELECT * FROM equipamientos');
    return equipment;
};

export default selectEquipmentModel;