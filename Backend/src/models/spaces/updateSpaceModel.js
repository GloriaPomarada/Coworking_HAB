import pool from '../../config/connection.js';

const updateSpaceModel = async ({
    id, // Se añade el id del espacio para actualizarlo
    nombre,
    descripcion,
    categoria_id,
    capacidad,
    precio_por_persona,
    precio_espacio_completo,
    direccion,
    estado 
   
}) => {
    const query = `
        UPDATE espacios
        SET nombre = ?, descripcion = ?, categoria_id = ?, capacidad = ?, precio_por_persona = ?, precio_espacio_completo = ?, direccion = ?, estado = ? 
        WHERE id = ?
    `;

    const [result] = await pool.query(query, [
        nombre,
        descripcion,
        categoria_id,
        capacidad,
        precio_por_persona,
        precio_espacio_completo,
        direccion,
        estado,
        id, // Se añade el id
    ]);

    return result.affectedRows; // Devuelve el número de filas afectadas
};

export default updateSpaceModel;
