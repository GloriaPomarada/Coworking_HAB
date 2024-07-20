import pool from '../../config/connection.js';

const selectUserById = async (userId, isPublic = false) => {
    let query;

    isPublic
        ? (query = `SELECT username, avatar FROM usuarios WHERE id = ?`)
        : (query = `SELECT id, username, email, role, createdAt, avatar FROM usuarios WHERE id = ?`);

    const [users] = await pool.query(query, [userId]);

    return users[0];
};

export default selectUserById;