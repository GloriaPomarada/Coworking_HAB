import pool from "../../config/connection.js";

const cancelBookingModel = async (usuario_id, reserva_id) => {
    const [reserva] = await pool.query('SELECT espacio_id FROM reservas WHERE id = ? AND usuario_id = ?', [reserva_id, usuario_id]);

    if (reserva.length === 0) {
        throw new Error('Reserva no encontrada o no pertenece al usuario');
    }

    const espacio_id = reserva[0].espacio_id;

    await pool.query(
        'UPDATE reservas SET estado = ? WHERE id = ?',
        ['cancelada', reserva_id]
    );

    await pool.query(
        'UPDATE espacios SET estado = ? WHERE id = ?',
        ['libre', espacio_id]
    );
};

export default cancelBookingModel;