import pool from "../../config/connection.js";
import * as ratingsModel from '../../models/ratings/index.js';

const postVoteController = async (req, res) => {
    const { reserva_id, value } = req.body;
    const usuario_id = req.user.id;

    // Validar que value esté en el rango permitido (1-5)
    if (value < 1 || value > 5) {
        return res.status(400).json({ message: 'El valor de la valoración debe estar entre 1 y 5.' });
    }

    try {
        // Verificar si la reserva existe y pertenece al usuario
        const [reservas] = await pool.query(
            'SELECT id, espacio_id, fecha_fin FROM reservas WHERE id = ? AND usuario_id = ? AND estado = "reservado"',
            [reserva_id, usuario_id]
        );

        if (reservas.length === 0) {
            return res.status(403).json({ message: 'No tienes permiso para valorar esta reserva o la reserva no existe.' });
        }

        const reserva = reservas[0];
        const now = new Date();

        // Comparar fecha de fin de la reserva con la fecha actual
        if (new Date(reserva.fecha_fin) > now) {
            return res.status(403).json({ message: 'No puedes valorar este espacio hasta que tu reserva haya finalizado.' });
        }

        const insertId = await ratingsModel.postNewVote(usuario_id, reserva.espacio_id, value, reserva_id);
        res.status(201).json({ message: 'Valoración añadida con éxito', id: insertId });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default postVoteController;
