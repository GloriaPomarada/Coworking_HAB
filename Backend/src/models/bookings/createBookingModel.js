import pool from "../../config/connection.js";
import { isWithinInterval } from 'date-fns';

const checkExistingReservation = async (espacio_id, fecha_inicio, fecha_fin) => {
    const [existingReservations] = await pool.query(
        'SELECT fecha_inicio, fecha_fin FROM reservas WHERE espacio_id = ?',
        [espacio_id]
    );

    // Convertir las fechas de la base de datos a objetos Date para comparar
    const reservasExistentes = existingReservations.map(reserva => ({
        fecha_inicio: new Date(reserva.fecha_inicio),
        fecha_fin: new Date(reserva.fecha_fin)
    }));

    // Verificar si hay superposición con alguna reserva existente
    const nuevaReservaIntervalo = {
        start: new Date(fecha_inicio),
        end: new Date(fecha_fin)
    };

    return reservasExistentes.some(reserva => {
        const intervaloReservaExistente = {
            start: reserva.fecha_inicio,
            end: reserva.fecha_fin
        };
        return isWithinInterval(nuevaReservaIntervalo.start, intervaloReservaExistente) ||
               isWithinInterval(nuevaReservaIntervalo.end, intervaloReservaExistente) ||
               isWithinInterval(intervaloReservaExistente.start, nuevaReservaIntervalo) ||
               isWithinInterval(intervaloReservaExistente.end, nuevaReservaIntervalo);
    });
};

const newBooking = async (
    usuario_id, 
    espacio_id, 
    tipo, 
    fecha_inicio, 
    fecha_fin, 
    observaciones
) => {
    const existeReserva = await checkExistingReservation(espacio_id, fecha_inicio, fecha_fin);
    if (existeReserva) {
        throw new Error('Ya existe una reserva para este espacio en el mismo intervalo de fechas');
    }

    const [result] = await pool.query(
        'INSERT INTO reservas (usuario_id, espacio_id, tipo, fecha_inicio, fecha_fin, estado, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [usuario_id, espacio_id, tipo, fecha_inicio, fecha_fin, 'pendiente', observaciones]
    );

    await pool.query(
        'UPDATE espacios SET estado = ? WHERE id = ?',
        ['reservado', espacio_id]
    );

    return {
        usuario_id,
        espacio_id,
        tipo,
        fecha_inicio,
        fecha_fin,
        observaciones
    }
};

export  {newBooking, checkExistingReservation};
