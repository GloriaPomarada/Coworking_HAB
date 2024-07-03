import pool from '../../config/connection.js';
import bcrypt from 'bcrypt';
import { recoveryCodeError } from '../../services/errorService.js';
import { getUserByEmail } from './index.js';

const updatePasswordModel = async (email, recoverPassCode, newPassword) => {
    const user = await getUserByEmail(email);

    if (!user || user.recoverPassCode !== recoverPassCode) {
        recoveryCodeError();
    }

    const hashedPass = await bcrypt.hash(newPassword, 10);

    await pool.query(
        `UPDATE usuarios SET password = ?, recoverPassCode = null WHERE recoverPassCode = ?`,
        [hashedPass, recoverPassCode]
    );
};

export default updatePasswordModel;
