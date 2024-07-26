import pool from "../../config/connection.js";

const spacesList = async () => {
    let sql = `SELECT e.id, e.nombre, e.descripcion, ce.nombre AS categorias_nombre
  FROM espacios e
  JOIN categorias_espacios ce ON e.categoria_id = ce.id
  WHERE 1`;

    try {
        const [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        throw new Error('Error al ejecutar la consulta en Espacio.filtrar: ' + error.message);
    }
};

export default spacesList;