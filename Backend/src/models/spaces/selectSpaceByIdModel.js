import pool from '../../config/connection.js';

const getSpaceByIdModel = async (spaceId) => {
    try {
        const [spaces] = await pool.query(
            `SELECT 
            E.id,
            E.nombre,
            E.descripcion,
            E.tipo,
            E.equipamiento,
            E.capacidad,
            E.precio_por_persona,
            E.precio_espacio_completo,
            E.direccion,
            E.estado,
            E.incidencias,
            E.imagen
            FROM espacios E WHERE E.id = ?`,
            [spaceId]
        );

        if (spaces.length === 0) {
            return null;
        }

        const [photos] = await pool.query(
            `SELECT id, name FROM espacios_fotos WHERE espacio_id = ?`,
            [spaceId]
        );

        spaces[0].imagen = photos;

        return spaces[0];
    } catch (error) {
        console.error('Error fetching space by ID:', error);
        throw error;
    }
};

export default getSpaceByIdModel;
