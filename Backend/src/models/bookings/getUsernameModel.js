import pool from '../../config/connection.js';

const getUsername = async (reservaID) => {
    const [username] = await pool.query(` SELECT username FROM reservas AS R INNER JOIN usuarios AS U ON (R.usuario_id = U.id ) WHERE R.id=${reservaID};`);
     return username;
};

export default getUsername;
