import * as bookingsModel from '../../models/bookings/index.js';
const bookingDetailController = async (req, res, next) => {
    try {
        const { reservaId } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        if (!reservaId) {
            return res.status(400).json({ mensaje: 'El ID de la reserva es requerido.' });
        }

        const data = await bookingsModel.detailModel(reservaId);

        if (!data) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada.' });
        }

        // Verificar permisos
        if (data.reservation.usuario_id !== userId && userRole !== 'admin') {
            return res.status(403).json({ mensaje: 'No tienes permiso para acceder a esta reserva.' });
        }

        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

export default bookingDetailController;
