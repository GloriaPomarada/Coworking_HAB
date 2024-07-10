import pool from '../../config/connection.js';

const getUserEmail = async (reservaID) => {
    const [email] = await pool.query(` SELECT email FROM reservas AS R INNER JOIN usuarios AS U ON (R.usuario_id = U.id ) WHERE R.id=${reservaID};`);
     return email;
};

export default getUserEmail;
