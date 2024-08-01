import pool from "../../config/connection.js";
const getPendingBookings = async () => {
    const sql = `
        SELECT 
            r.id, 
            r.usuario_id, 
            r.espacio_id, 
            r.tipo, 
            DATE_FORMAT(r.fecha_inicio, '%Y-%m-%d') AS fecha_inicio, 
            DATE_FORMAT(r.fecha_fin, '%Y-%m-%d') AS fecha_fin, 
            r.estado, 
            r.observaciones, 
            u.username AS usuario_username, 
            e.nombre AS espacio_nombre
        FROM reservas r 
        JOIN usuarios u ON r.usuario_id = u.id 
        JOIN espacios e ON r.espacio_id = e.id
        WHERE r.estado = 'pendiente';
    `;

    try {
        const [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener las reservas pendientes: ' + error.message);
    }
};

export default getPendingBookings;