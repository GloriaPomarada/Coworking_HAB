import pool from '../../config/connection.js';

const filterModel = async (filters) => {
    let sql = `
        SELECT DISTINCT e.id, e.nombre, e.descripcion, e.capacidad, e.precio_espacio_completo, e.direccion, e.estado, e.valoracion_media, ce.nombre AS categorias_nombre,
        (SELECT GROUP_CONCAT(eq.nombre SEPARATOR ', ')
         FROM espacios_equipamientos ee
         JOIN equipamientos eq ON ee.equipamiento_id = eq.id
         WHERE ee.espacio_id = e.id) AS equipamiento,
        ef.name AS imagen
        FROM espacios e
        JOIN categorias_espacios ce ON e.categoria_id = ce.id
        LEFT JOIN espacios_equipamientos ee ON e.id = ee.espacio_id
        LEFT JOIN equipamientos eq ON ee.equipamiento_id = eq.id
        LEFT JOIN (
            SELECT ef1.espacio_id, ef1.name
            FROM espacios_fotos ef1
            INNER JOIN (
                SELECT espacio_id, MIN(id) AS min_id
                FROM espacios_fotos
                GROUP BY espacio_id
            ) ef2 ON ef1.espacio_id = ef2.espacio_id AND ef1.id = ef2.min_id
        ) ef ON e.id = ef.espacio_id
        WHERE 1
    `;

    const params = [];

    //*-> Construir la consulta dinámica.
    if (filters.id) {
        sql += ' AND e.id = ?';
        params.push(filters.id);
    }
    if (filters.nombre) {
        sql += ' AND e.nombre LIKE ?';
        params.push('%' + filters.nombre + '%');
    }
    if (filters.capacidad) {
        sql += ' AND e.capacidad >= ?';
        params.push(filters.capacidad);
    }
    if (filters.precioDesde) {
        sql += ' AND e.precio_espacio_completo >= ?';
        params.push(filters.precioDesde);
    }
    if (filters.precioHasta) {
        sql += ' AND e.precio_espacio_completo <= ?';
        params.push(filters.precioHasta);
    }
    if (filters.estado) {
        sql += ' AND e.estado = ?';
        params.push(filters.estado);
    }
    if (filters.valoracion_media) {
        sql += ' AND e.valoracion_media >= ?';
        params.push(filters.valoracion_media);
    }
    if (filters.categoria_nombre) {
        sql += ' AND ce.nombre LIKE ?';
        params.push('%' + filters.categoria_nombre + '%');
    }
    if (filters.equipamiento) {
        sql += ' AND eq.nombre LIKE ?';
        params.push('%' + filters.equipamiento + '%');
    }

    //*-> Añadir lógica de ordenación.
    if (filters.orderBy) {
        const allowedColumns = [
            'e.precio_espacio_completo',
            'e.capacidad',
            'e.valoracion_media',
        ];
        if (allowedColumns.includes(`e.${filters.orderBy}`)) {
            sql += ` ORDER BY ${filters.orderBy}`;
            if (
                filters.orderDirection &&
                ['ASC', 'DESC'].includes(filters.orderDirection.toUpperCase())
            ) {
                sql += ` ${filters.orderDirection.toUpperCase()}`;
            } else {
                sql += ' ASC';
            }
        }
    }

    try {
        const [rows] = await pool.query(sql, params);
        return rows;
    } catch (error) {
        throw new Error(
            'Error al ejecutar la consulta en Espacio.filtrar: ' + error.message
        );
    }
};

export default filterModel;
