import pool from "../../config/connection.js";

const filteredSpaces = async (filters) => {
    let sql = 'SELECT * FROM espacios WHERE 1';
    const params = [];

    // Construir la consulta dinámicamente según los filtros recibidos
    if (filters.id) {
        sql += ' AND id = ?';
        params.push(filters.id);
    }
    if (filters.nombre) {
        sql += ' AND nombre LIKE ?';
        params.push('%' + filters.nombre + '%');
    }
    if (filters.capacidad) {
        sql += ' AND capacidad >= ?';
        params.push(filters.capacidad);
    }
    if (filters.precioDesde) {
        sql += ' AND precio_por_persona >= ?';
        params.push(filters.precioDesde);
    }
    if (filters.precioHasta) {
        sql += ' AND precio_por_persona <= ?';
        params.push(filters.precioHasta);
    }
    if (filters.estado) {
        sql += ' AND estado = ?';
        params.push(filters.estado);
    }

    try {
        const [rows] = await pool.query(sql, params);
        return rows;
    } catch (error) {
        throw new Error('Error al ejecutar la consulta en Espacio.filtrar: ' + error.message);
    }
};

export default filteredSpaces;