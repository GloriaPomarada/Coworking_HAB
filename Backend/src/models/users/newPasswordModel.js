import pool from "../../config/connection.js";

const getUser = async (id) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
};

const updatePassword = async (id, hashedPassword) => {
    await pool.query('UPDATE usuarios SET password = ? WHERE id = ?', [hashedPassword, id]);
};

export { getUser, updatePassword };
