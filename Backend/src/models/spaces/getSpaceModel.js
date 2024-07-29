import pool from '../../config/connection.js';

const getEspacio = async (espacioId = null) => {
    let sql;
    if (espacioId) {
        sql = `SELECT e.*, ef.name AS espacio_imagen
               FROM espacios e
               LEFT JOIN espacios_fotos ef ON e.id = ef.espacio_id
               WHERE e.id = ?`;
    } else {
        sql = `SELECT * FROM espacios`;
    }

    try {
        const [rows] = espacioId
            ? await pool.query(sql, [espacioId])
            : await pool.query(sql);

        if (espacioId) {
            if (!rows.length) {
                return null;
            }

            const espacio = {
                id: rows[0].id,
                nombre: rows[0].nombre,
                descripcion: rows[0].descripcion,
                categoria_id: rows[0].categoria_id,
                capacidad: rows[0].capacidad,
                precio_espacio_completo: rows[0].precio_espacio_completo,
                direccion: rows[0].direccion,
                estado: rows[0].estado,
                valoracion_media: rows[0].valoracion_media,
                imagenes: rows.map(row => row.espacio_imagen).filter(Boolean)
            };

            return espacio;
        } else {
            return rows;
        }
    } catch (error) {
        throw new Error('Error al obtener el espacio: ' + error.message);
    }
};

export default getEspacio;
