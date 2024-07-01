import pool from '../../config/connection.js';

const incidentListModel = async () => {
    const [incidents] = await pool.query('SELECT * FROM incidencias');
    return incidents;
};

export default incidentListModel;