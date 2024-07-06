import pool from "../../config/connection.js";

const newBooking = async (
    usuario_id, 
    espacio_id, 
    tipo, 
    fecha_inicio, 
    fecha_fin, 
    observaciones

) => {
    await pool.query(
        'INSERT INTO reservas (usuario_id, espacio_id, tipo, fecha_inicio, fecha_fin, estado, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [usuario_id, espacio_id, tipo, fecha_inicio, fecha_fin, 'pendiente', observaciones]
    );
    
 
    await pool.query(
        'UPDATE espacios SET estado = ? WHERE id = ?',
        ['reservado', espacio_id]
    );
  };


export default newBooking;