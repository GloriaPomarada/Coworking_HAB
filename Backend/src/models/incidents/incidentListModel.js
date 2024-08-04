import pool from "../../config/connection.js";

const filteredIncidences = async (filters, userId, userRole) => {
    let sql = `
        SELECT 
            i.id, 
            e.nombre AS espacio_nombre, 
            i.fecha_creacion,
            COALESCE(m.mensaje, '') AS mensaje
        FROM incidencias i
        JOIN espacios e ON i.espacio_id = e.id
        LEFT JOIN mensajes_incidencias m ON i.id = m.incidencia_id
        WHERE 1=1`; 

    const params = [];

    // Filtro por rol del usuario
    if (userRole !== 'admin') {
        sql += ' AND i.usuario_id = ?';
        params.push(userId);
    }

    try {
        const [rows] = await pool.query(sql, params);

        return rows;
    } catch (error) {
        console.error('Error al ejecutar la consulta de filtrado de incidencias:', error.message);
        throw new Error('Error al ejecutar la consulta de filtrado de incidencias: ' + error.message);
    }
};

export default filteredIncidences;
