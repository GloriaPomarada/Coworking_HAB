import pool from '../../config/connection.js';

const getReservationStartDate = async (reserva_id) => {
    try {
        const sql = `SELECT fecha_inicio FROM reservas WHERE id = ?`;
        const [rows] = await pool.query(sql, [reserva_id]);
        return rows.length > 0 ? rows[0].fecha_inicio : null;
    } catch (error) {
        throw new Error('Error al obtener la fecha de inicio de la reserva: ' + error.message);
    }
};

const newIncident = async (reserva_id, usuario_id, categoria_incidencia_id, titulo) => {
    try {
        // El ID del espacio se obtiene basado en la reserva.
        const sql = `
            INSERT INTO incidencias (espacio_id, reserva_id, usuario_id, categoria_incidencia_id, titulo, fecha_creacion)
            VALUES ((SELECT espacio_id FROM reservas WHERE id = ?), ?, ?, ?, ?, NOW())
        `;
        const values = [reserva_id, reserva_id, usuario_id, categoria_incidencia_id, titulo];

        const result = await pool.query(sql, values);
        return result.insertId; // Devuelve el ID de la incidencia creada.
        
    } catch (error) {
        throw new Error('Error al crear la incidencia en la base de datos: ' + error.message);
    }
};

export { getReservationStartDate, newIncident };
