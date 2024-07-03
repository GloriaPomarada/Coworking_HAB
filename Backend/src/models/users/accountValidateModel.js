import pool from '../../config/connection.js';
import { notFoundError } from '../../services/errorService.js';

const validateAccountModel = async (registrationCode) => {
    // Comprobamos si existe un usuario con ese código de registro.
    const [users] = await pool.query(
        `SELECT id FROM usuarios WHERE registrationCode = ?`,
        [registrationCode]
    );

    if (users.length < 1) {
        notFoundError('usuario');
    }

    await pool.query(
        `UPDATE usuarios SET active = true, registrationCode = null WHERE registrationCode = ?`,
        [registrationCode]
    );

    return 'Cuenta activada!';
};

export default validateAccountModel;
