import pool from "../../config/connection.js";
import votesSchema from "../../schema/ratings/votesSchema.js";
import * as ratingsModel from '../../models/ratings/index.js';

const postVoteController = async (req, res, next) => {
    const { reserva_id, value } = req.body;
    const usuario_id = req.user.id;
    
    const { error } = votesSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const [reservas] = await pool.query(
            'SELECT id, espacio_id, fecha_fin FROM reservas WHERE id = ? AND usuario_id = ?  AND estado = "finalizada"',
            [reserva_id, usuario_id]
        );

        if (reservas.length === 0) {
            return res.status(403).json({ message: 'No puedes votar hasta que la reserva sea aceptada y haya finalizado.' });
        }

        const reserva = reservas[0];
        const now = new Date();

        // Comparar fecha de fin de la reserva con fecha actual.
        if (new Date(reserva.fecha_fin) > now) {
            return res.status(403).json({ message: 'No puedes valorar este espacio hasta que tu reserva haya finalizado.' });
        }

        try {
            const insertId = await ratingsModel.postNewVote(usuario_id, reserva.espacio_id, value, reserva_id);
            
            res.send({
                status: 'ok', 
                message: 'Valoración añadida con éxito', 
                id: insertId 
            });
        } catch (err) {
            if (err.message.includes('Ya has realizado una votación para esta reserva.')) {
                return res.status(409).json({ message: err.message });
            }
            next(err);
        }

    } catch (err) {
        next(err);
    }
};

export default postVoteController;
