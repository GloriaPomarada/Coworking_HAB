// Importamos la función que devuelve una conexión con la base de datos.
import pool from '../../config/connection.js';

// Función que realiza una consulta a la base de datos para obtener el listado de espacios.
const selectAllSpacesModel = async (keyword = '', userId = '') => {
    const [spaces] = await pool.query('SELECT * FROM espacios');

    // Retornamos los espacios.
    return spaces;
};

export default selectAllSpacesModel;