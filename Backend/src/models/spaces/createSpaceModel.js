import pool from '../../config/connection.js';

const createSpaceModel = async ({
    nombre,
    descripcion,
    categoria_id,
    capacidad,
    precio_por_persona,
    precio_espacio_completo,
    direccion,
    estado = null, // Default value if not provided
    incidencias = null, // Default value if not provided
}) => {
    const query = `
        INSERT INTO espacios (nombre, descripcion, categoria_id, capacidad, precio_por_persona, precio_espacio_completo, direccion, estado, incidencias)
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
        incidencias,
    ]);

    // Get the ID of the newly inserted row
    const newSpaceId = result.insertId;

    return newSpaceId;
};

export default createSpaceModel;
