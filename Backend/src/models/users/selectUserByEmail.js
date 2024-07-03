import pool from '../../config/connection.js';

const selectUserByEmail = async (email) => {
    const [users] = await pool.query(
        `SELECT id, password, active, recoverPassCode FROM usuarios WHERE email = ?`,
        [email]
    );

    return users[0];
};

export default selectUserByEmail;
