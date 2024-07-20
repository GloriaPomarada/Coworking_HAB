import pool from '../../config/connection.js';

// Función para obtener la información de la reserva asociada a una incidencia
export const getBookingInfo = async (incidenciaId) => {
    try {
        const query = `
            SELECT r.id AS reserva_id, r.usuario_id, r.espacio_id
            FROM reservas r
            INNER JOIN incidencias i ON r.id = i.reserva_id
            WHERE i.id = ?
        `;
        const [rows] = await pool.execute(query, [incidenciaId]);
        return rows.length ? rows[0] : null; // Devuelve la primera fila encontrada o null si no hay resultados
    } catch (error) {
        throw error;
    }
};

// Función para crear un mensaje de incidencia
export const createMessage = async (incidenciaId, mensaje, espacioId, reservaId, usuarioId) => {
    try {
        const query = `
            INSERT INTO mensajes_incidencias (incidencia_id, mensaje, espacio_id, reserva_id, usuario_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.execute(query, [incidenciaId, mensaje, espacioId, reservaId, usuarioId]);
        return result.insertId; // Devuelve el ID del mensaje insertado
    } catch (error) {
        throw error;
    }
};
