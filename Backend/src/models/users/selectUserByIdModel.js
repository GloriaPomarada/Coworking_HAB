import pool from '../../config/connection.js';

const selectUserById = async (id) => {
    const [users] = await pool.query(
        `SELECT id, password, active, recoverPassCode FROM usuarios WHERE id = ?`,
        [id]
    );

    return users[0];
};

export default selectUserById;