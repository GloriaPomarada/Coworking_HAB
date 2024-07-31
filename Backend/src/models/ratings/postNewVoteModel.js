import pool from "../../config/connection.js";

const postNewVote = async (usuario_id, espacio_id, value, reserva_id) => {
    // Validar los datos de entrada
    if (!usuario_id || !espacio_id || value === undefined || !reserva_id) {
        throw new Error('Todos los campos son obligatorios.');
    }
    if (value < 1 || value > 5) {
        throw new Error('La valoración debe estar entre 1 y 5.');
    }

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
