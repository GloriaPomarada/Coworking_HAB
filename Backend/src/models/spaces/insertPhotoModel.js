import pool from '../../config/connection.js';

const insertPhotosModel = async (photos, spaceId) => {
    // Validamos que se proporcione el spaceId
    if (!spaceId) {
        throw new Error('No spaceId provided.');
    }

    // Validamos que spaceId exista en la base de datos
    const [spaceResult] = await pool.query(
        `SELECT id FROM espacios WHERE id = ?`,
        [spaceId]
    );

    if (spaceResult.length === 0) {
        // Si spaceId no existe, manejamos el error
        throw new Error(`Space con el ID ${spaceId} no existe.`);
    }

    const photoIds = [];
    for (const photoName of photos) {
        const [result] = await pool.query(
            `INSERT INTO espacios_fotos (name, espacio_id) VALUES(?, ?)`,
            [photoName, spaceId]
        );
        photoIds.push(result.insertId);
    }

    return photoIds;
};

export default insertPhotosModel;
