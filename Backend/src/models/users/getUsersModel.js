import pool from "../../config/connection.js";

const filteredUsers = async (filters) => {
    let sql = 'SELECT * FROM usuarios WHERE 1';
    const params = [];

    if (filters.id) {
        sql += ' AND id = ?';
        params.push(filters.id);
    }
    if (filters.email) {
        sql += ' AND email LIKE ?';
        params.push('%' + filters.email + '%');
    }
    if (filters.username) {
        sql += ' AND username LIKE ?';
        params.push('%' + filters.username + '%');
    }
    if (filters.active !== undefined) {  
        sql += ' AND active = ?';
        params.push(filters.active);
    }
    if (filters.role) {
        sql += ' AND role = ?';
        params.push(filters.role);
    }

    try {
        const [rows] = await pool.query(sql, params);
        return rows;
    } catch (error) {
        throw new Error('Error al ejecutar la consulta de filtro de usuarios ');
    }
};

export default filteredUsers;
