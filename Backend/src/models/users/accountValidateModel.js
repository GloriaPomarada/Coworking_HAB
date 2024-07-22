import pool from '../../config/connection.js';
import { notFoundError } from '../../services/errorService.js';

const validateAccountModel = async (registrationCode) => {
    try {
        const [users] = await pool.query(
            `SELECT id FROM usuarios WHERE registrationCode = ?`,
            [registrationCode]
        );

        if (users.length < 1) {
            throw notFoundError('usuario');
        }

        const [result] = await pool.query(
            `UPDATE usuarios SET active = true, registrationCode = null WHERE registrationCode = ? AND active = false`,
            [registrationCode]
        );

        return {
            success: result.affectedRows > 0,
            message: 'Cuenta activada!',
            userId: users[0].id,
        };
    } catch (error) {
        if (error.code === 'RESOURCE_NOT_FOUND') {
            throw error;
        }
        // Aquí podríamos manejar otros tipos de errores de base de datos
        throw new Error('Error en la operación de base de datos');
    }
};

export default validateAccountModel;
