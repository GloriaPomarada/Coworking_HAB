import pool from '../../config/connection.js';

const typesOfIncidentsModel = async () => {
    const [typesOfincidents] = await pool.query('SELECT * FROM categorias_incidencias');
    return typesOfincidents;
};

export default typesOfIncidentsModel;
