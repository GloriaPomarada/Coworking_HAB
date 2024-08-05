import pool from '../../config/connection.js';

const getEspacio = async (espacioId = null) => {
    let sql;
    if (espacioId) {
        // Query para obtener un solo espacio
        sql = `SELECT e.*, ef.id AS espacio_imagen_id, ef.name AS espacio_imagen, ce.nombre AS categoria_nombre, eq.nombre AS equipamiento_nombre
               FROM espacios e
               LEFT JOIN espacios_fotos ef ON e.id = ef.espacio_id
               LEFT JOIN categorias_espacios ce ON e.categoria_id = ce.id
               LEFT JOIN espacios_equipamientos ee ON e.id = ee.espacio_id
               LEFT JOIN equipamientos eq ON ee.equipamiento_id = eq.id
               WHERE e.id = ?`;
    } else {
        // Query para obtener todos los espacios
        sql = `SELECT e.*, ef.id AS espacio_imagen_id, ef.name AS espacio_imagen, ce.nombre AS categoria_nombre, eq.nombre AS equipamiento_nombre
               FROM espacios e
               LEFT JOIN espacios_fotos ef ON e.id = ef.espacio_id
               LEFT JOIN categorias_espacios ce ON e.categoria_id = ce.id
               LEFT JOIN espacios_equipamientos ee ON e.id = ee.espacio_id
               LEFT JOIN equipamientos eq ON ee.equipamiento_id = eq.id
               ORDER BY e.id DESC`;
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
                categoria_nombre: rows[0].categoria_nombre,
                capacidad: rows[0].capacidad,
                precio_por_persona: rows[0].precio_por_persona,
                precio_espacio_completo: rows[0].precio_espacio_completo,
                direccion: rows[0].direccion,
                estado: rows[0].estado,
                valoracion_media: rows[0].valoracion_media,
                imagenes: rows
                    .map((row) => ({
                        id: row.espacio_imagen_id,
                        filename: row.espacio_imagen,
                    }))
                    .filter((img) => img.id && img.filename),
                equipamientos: rows
                    .map((row) => row.equipamiento_nombre)
                    .filter(Boolean),
            };

            return espacio;
        } else {
            const espacios = {};

            rows.forEach((row) => {
                if (!espacios[row.id]) {
                    espacios[row.id] = {
                        id: row.id,
                        nombre: row.nombre,
                        descripcion: row.descripcion,
                        categoria_nombre: row.categoria_nombre,
                        capacidad: row.capacidad,
                        precio_espacio_completo: row.precio_espacio_completo,
                        direccion: row.direccion,
                        estado: row.estado,
                        valoracion_media: row.valoracion_media,
                        imagenes: [],
                        equipamientos: [],
                    };
                }

                if (row.espacio_imagen_id) {
                    espacios[row.id].imagenes.push({
                        id: row.espacio_imagen_id,
                        filename: row.espacio_imagen,
                    });
                }

                if (row.equipamiento_nombre) {
                    espacios[row.id].equipamientos.push(
                        row.equipamiento_nombre
                    );
                }
            });

            return Object.values(espacios);
        }
    } catch (error) {
        throw new Error('Error al obtener el espacio: ' + error.message);
    }
};

export default getEspacio;
