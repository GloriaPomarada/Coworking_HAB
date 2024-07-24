import pool from '../../config/connection.js';

const getEspacio = async (espacioId = null) => {
    let sql = espacioId
        ? 'SELECT * FROM espacios WHERE id = ?'
        : 'SELECT * FROM espacios';

    try {
        const [rows] = espacioId
            ? await pool.query(sql, [espacioId])
            : await pool.query(sql);
        return espacioId ? rows[0] : rows;
    } catch (error) {
        throw new Error('Error al obtener el espacio: ' + error.message);
    }
};

export default getEspacio;

// import pool from '../../config/connection.js';

// const getEspacio = async (espacioId) => {
//     let sql = 'SELECT * FROM espacios WHERE id = ?';

//     try {
//         const [rows] = await pool.query(sql, [espacioId]);
//         return rows[0]; // Devolvemos el primer (y único) resultado
//     } catch (error) {
//         throw new Error('Error al obtener el espacio: ' + error.message);
//     }
// };

// export default getEspacio;
