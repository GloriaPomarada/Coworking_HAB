import pool from '../../config/connection.js';

const updateReservaEstado = async (id, estado) => {
    const [reservaHecha] = await pool.query('UPDATE reservas SET estado = ? WHERE id = ?',[
        id,
        estado
    ]);
     return reservaHecha;
};

export default updateReservaEstado;