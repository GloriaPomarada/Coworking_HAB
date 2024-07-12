import cron from 'node-cron';
import pool from '../config/connection.js';

const updateSpaceStatus = async () => {
    try {
        // Obtener la fecha y hora actual en formato compatible con MySQL
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Actualizar estado de espacios donde la reserva ha terminado
        await pool.query(
            `
            UPDATE espacios
            SET estado = 'libre'
            WHERE id IN (
                SELECT espacio_id
                FROM reservas
                WHERE fecha_fin < ? AND estado = 'reservado'
            )
        `,
            [now]
        );

        // Actualizar el estado de la reserva para indicar que el espacio queda libre
        await pool.query(
            `
            UPDATE reservas
            SET estado = 'finalizada'
            WHERE fecha_fin < ? AND estado = 'reservado'
        `,
            [now]
        );

        console.log('Estado de los espacios actualizado con éxito.');
    } catch (error) {
        console.error('Error al actualizar el estado de los espacios:', error);
    }
};

// Programar la tarea para que se ejecute todos los días a las 06:30h
cron.schedule('30 6 * * *', updateSpaceStatus);
