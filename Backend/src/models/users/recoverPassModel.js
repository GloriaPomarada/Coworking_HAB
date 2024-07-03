import pool from '../../config/connection.js';
import { notFoundError } from '../../services/errorService.js';



// Consulta a la base de datos para actualizar el password de un usuario.
const recoverPassModel = async (email, recoverPassCode) => {
    const [users] = await pool.query(
        `SELECT id, recoverPassCode FROM usuarios WHERE email = ?`,
        [email]
    );

    const user = users[0];
    if (!user) {
        notFoundError('usuario');
    }

    await pool.query(`UPDATE usuarios SET recoverPassCode = ? WHERE email = ?`, [
        recoverPassCode,
        email,
    ]);
};
export default recoverPassModel;
