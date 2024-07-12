import pool from "../../config/connection.js";

const postNewVote = async (usuario_id, espacio_id, value, reserva_id) => {
    try {
        const [result] = await pool.query(
            'INSERT INTO espacios_votos (usuario_id, espacio_id, value, reserva_id) VALUES (?, ?, ?, ?)',
            [usuario_id, espacio_id, value, reserva_id]
        );
        return result.insertId;

    } catch (error) {
        throw new Error('Error al añadir la valoración: ' + error.message);
    }
}

export default postNewVote;