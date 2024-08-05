import pool from "../../config/connection.js";

const getMessagesModel = async (incidenciaId) => {
    let sql = `
        SELECT 
            m.id AS mensaje_id,
            m.mensaje,
            DATE_FORMAT(m.fecha_creacion, '%d/%m/%Y') AS fecha_creacion,
            DATE_FORMAT(m.fecha_creacion, '%H:%i:%s') AS hora_creacion,
            e.nombre AS espacio_nombre,
            i.titulo AS incidencia_titulo,
            u.username 
        FROM mensajes_incidencias m
        JOIN incidencias i ON m.incidencia_id = i.id
        JOIN espacios e ON i.espacio_id = e.id
        JOIN usuarios u ON m.usuario_id = u.id 
        WHERE m.incidencia_id = ?
        ORDER BY m.fecha_creacion DESC;`;

    try {
        const [rows] = await pool.query(sql, [incidenciaId]);
        return rows;
    } catch (error) {
        console.error('Error al obtener los mensajes por incidencia:', error.message);
        throw new Error('Error al obtener los mensajes por incidencia: ' + error.message);
    }
};

export default getMessagesModel;
