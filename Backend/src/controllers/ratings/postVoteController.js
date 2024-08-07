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
        // Verificar si la reserva existe y pertenece al usuario.
        const [reservas] = await pool.query(
            'SELECT id, espacio_id, fecha_fin FROM reservas WHERE id = ? AND usuario_id = ?  AND estado = "reservado"',
            [reserva_id, usuario_id]
        );

        if (reservas.length === 0) {
            return res.status(403).json({ message: 'Tu reserva aún no ha sido aceptada.' });
        }

        const reserva = reservas[0];
        const now = new Date();

        // Comparar fecha de fin de reserva Vs fecha actual.
        if (new Date(reserva.fecha_fin) > now) {
            return res.status(403).json({ message: 'No puedes valorar este espacio hasta que tu reserva haya finalizado.' });
        }

        const insertId = await ratingsModel.postNewVote(usuario_id, reserva.espacio_id, value, reserva_id);
        
        res.send({
            status: 'ok', 
            message: 'Valoración añadida con éxito', 
            id: insertId 
        });

    } catch (err) {
        next(err);
    }
};

export default postVoteController;
