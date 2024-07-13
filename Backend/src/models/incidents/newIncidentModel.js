import pool from '../../config/connection.js';

const newIncident = async (espacio_id, reserva_id, usuario_id, categoria_incidencia_id, titulo, fecha_creacion) => {
    try {
        const sql = `
            INSERT INTO incidencias (espacio_id, reserva_id, usuario_id, categoria_incidencia_id, titulo, fecha_creacion)
            VALUES (?, ?, ?, ?, ?, NOW())
        `;
        const values = [espacio_id, reserva_id, usuario_id, categoria_incidencia_id, titulo, fecha_creacion];

        const result = await pool.query(sql, values);
        return result.insertId; // Devuelve el ID de la incidencia creada
        
    } catch (error) {
        throw new Error('Error al crear la incidencia en la base de datos: ' + error.message);
    }
};

export default newIncident;
