import pool from "../../config/connection.js";

const filteredBookings = async (filters, userId, userRole) => {
    let sql = `
        SELECT 
            r.id, 
            r.usuario_id, 
            r.espacio_id, 
            r.tipo, 
            DATE_FORMAT(r.fecha_inicio, '%d-%m-%Y') as fecha_inicio, 
            DATE_FORMAT(r.fecha_fin, '%d-%m-%Y') as fecha_fin, 
            r.estado, 
            r.observaciones, 
            u.username as usuario_username, 
            e.nombre as espacio_nombre,
            ev.value as valoracion,
            ef.name as espacio_foto_name  -- Selecciona el nombre del archivo
        FROM reservas r 
        JOIN usuarios u ON r.usuario_id = u.id 
        JOIN espacios e ON r.espacio_id = e.id
        LEFT JOIN espacios_votos ev ON r.id = ev.reserva_id AND ev.usuario_id = r.usuario_id 
        LEFT JOIN (
            SELECT 
                espacio_id, 
                name 
            FROM espacios_fotos 
            WHERE id IN (SELECT MIN(id) FROM espacios_fotos GROUP BY espacio_id)
        ) ef ON r.espacio_id = ef.espacio_id  -- Unir con la tabla espacios_fotos
        WHERE 1=1`;

    const params = [];

    if (userRole !== 'admin') {
        sql += ' AND r.usuario_id = ?';
        params.push(userId);
    }

    if (filters.id) {
        sql += ' AND r.id = ?';
        params.push(filters.id);
    }
    if (filters.usuario_id) {
        sql += ' AND r.usuario_id = ?';
        params.push(filters.usuario_id);
    }
    if (filters.espacio_id) {
        sql += ' AND r.espacio_id = ?';
        params.push(filters.espacio_id);
    }
    if (filters.tipo) {
        sql += ' AND r.tipo LIKE ?';
        params.push('%' + filters.tipo + '%');
    }
    if (filters.fecha_inicio) {
        sql += ' AND DATE(r.fecha_inicio) = ?';
        params.push(filters.fecha_inicio);
    }
    if (filters.fecha_fin) {
        sql += ' AND DATE(r.fecha_fin) = ?';
        params.push(filters.fecha_fin);
    }
    if (filters.estado) {
        sql += ' AND r.estado = ?';
        params.push(filters.estado);
    }
    if (filters.observaciones) {
        sql += ' AND r.observaciones LIKE ?';
        params.push('%' + filters.observaciones + '%');
    }
    if (filters.usuario_username) {
        sql += ' AND u.username LIKE ?';
        params.push('%' + filters.usuario_username + '%');
    }
    if (filters.espacio_nombre) {
        sql += ' AND e.nombre LIKE ?';
        params.push('%' + filters.espacio_nombre + '%');
    }

    try {
        const [rows] = await pool.query(sql, params);

        if (userRole !== 'admin' && rows.length === 0) {
            throw new Error('No tienes permiso para acceder a estas reservas.');
        }

        return rows;
    } catch (error) {
        throw new Error('Error al ejecutar la consulta de filtrado de reservas: ' + error.message);
    }
};

export default filteredBookings;
