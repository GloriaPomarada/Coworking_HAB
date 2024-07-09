import pool from "../../config/connection.js";

const filteredIncidences = async (filters) => {
    let sql = `
        SELECT 
            i.id, 
            i.espacio_id, 
            i.categoria_incidencia_id, 
            i.mensaje, 
            i.fecha,
            u.id as usuario_id,
            u.username
        FROM incidencias i
        JOIN espacios e ON i.espacio_id = e.id
        LEFT JOIN reservas r ON r.espacio_id = e.id
        LEFT JOIN usuarios u ON r.usuario_id = u.id
        WHERE 1`;
    const params = [];

    if (filters.id) {
        sql += ' AND i.id = ?';
        params.push(filters.id);
    }
    if (filters.espacio_id) {
        sql += ' AND i.espacio_id = ?';
        params.push(filters.espacio_id);
    }
    if (filters.categoria_incidencia_id) {
        sql += ' AND i.categoria_incidencia_id = ?';
        params.push(filters.categoria_incidencia_id);
    }
    if (filters.mensaje) {
        sql += ' AND i.mensaje LIKE ?';
        params.push('%' + filters.mensaje + '%');
    }
    if (filters.fecha) {
        sql += ' AND i.fecha = ?';
        params.push(filters.fecha);
    }
    if (filters.usuario_id) {
        sql += ' AND u.id = ?';
        params.push(filters.usuario_id);
    }
    if (filters.username) {
        sql += ' AND u.username LIKE ?';
        params.push('%' + filters.username + '%');
    }

    try {
        console.log("Executing SQL: ", sql, params);
        const [rows] = await pool.query(sql, params);
        console.log("Query result: ", rows);
        return rows;
    } catch (error) {
        console.error('Error al ejecutar la consulta de filtrado de incidencias: ', error.message);
        throw new Error('Error al ejecutar la consulta de filtrado de incidencias: ' + error.message);
    }
};

export default filteredIncidences;
