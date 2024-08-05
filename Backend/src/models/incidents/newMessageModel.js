import pool from '../../config/connection.js';

export const getIncidenceInfo = async (incidenciaId) => {
    try {
        const query = `
            SELECT i.espacio_id, i.reserva_id, i.usuario_id
            FROM incidencias i
            WHERE i.id = ?
        `;
        const [rows] = await pool.execute(query, [incidenciaId]);
        return rows.length ? rows[0] : null; 
    } catch (error) {
        throw error;
    }
};

export const createMessage = async (incidenciaId, mensaje, espacioId, reservaId, usuarioId) => {
    try {
        const query = `
            INSERT INTO mensajes_incidencias (incidencia_id, espacio_id, reserva_id, mensaje, usuario_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.execute(query, [incidenciaId, espacioId, reservaId, mensaje, usuarioId]);
        return result.insertId; 
    } catch (error) {
        throw error;
    }
};
