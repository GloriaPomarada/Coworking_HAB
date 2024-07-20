import pool from '../../config/connection.js';

const createSpaceModel = async ({
    nombre,
    descripcion,
    categoria_id,
    capacidad,
    precio_por_persona,
    precio_espacio_completo,
    direccion,
    estado = null,
    valoracion_media,
}) => {
    const query = `
        INSERT INTO espacios (nombre, descripcion, categoria_id, capacidad, precio_por_persona, precio_espacio_completo, direccion, estado, valoracion_media )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        valoracion_media,
    ]);

    
    const newSpaceId = result.insertId;

    return newSpaceId;
};

export default createSpaceModel;
