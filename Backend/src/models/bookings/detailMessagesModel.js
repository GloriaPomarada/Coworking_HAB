import pool from "../../config/connection.js";

const detailWithMessages = async (reservaId) => {
    try {
        const reservationQuery = `
            SELECT r.*, u.username, u.email
            FROM reservas r
            JOIN usuarios u ON r.usuario_id = u.id
            WHERE r.id = ?
        `;
        const messagesQuery = `
            SELECT mi.*
            FROM mensajes_incidencias mi
            JOIN incidencias i ON mi.incidencia_id = i.id
            WHERE i.reserva_id = ?
        `;

        const [reservationRows] = await pool.query(reservationQuery, [reservaId]);
        const [messagesRows] = await pool.query(messagesQuery, [reservaId]);

        if (reservationRows.length === 0) {
            return null; // No se encontró la reserva
        }

        return {
            reservation: reservationRows[0],
            messages: messagesRows,
        };
    } catch (error) {
        throw error;
    }
};

export default detailWithMessages;