import pool from '../../config/connection.js';

// Obtener incidencias asociadas a un usuario específico con nombre del espacio
export const getIncidentsByUser = async (userId) => {
  try {
    const query = `
      SELECT i.id, i.titulo, i.fecha_creacion, e.nombre AS espacio_nombre
      FROM incidencias i
      JOIN espacios e ON i.espacio_id = e.id
      WHERE i.usuario_id = ?
    `;
    const [rows] = await pool.query(query, [userId]);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Obtener todas las incidencias (solo para admin)
export const getAllIncidents = async () => {
  try {
    const query = `
      SELECT i.id, i.titulo, i.fecha_creacion, e.nombre AS espacio_nombre
      FROM incidencias i
      JOIN espacios e ON i.espacio_id = e.id
    `;
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Obtener mensajes para una incidencia específica
export const getMessagesForIncident = async (incidentId) => {
  try {
    const query = `
      SELECT m.id, m.mensaje, m.fecha_creacion, e.nombre AS espacio_nombre, u.email
      FROM mensajes_incidencias m
      JOIN espacios e ON m.espacio_id = e.id
      JOIN usuarios u ON m.usuario_id = u.id -- Asumiendo que tienes una tabla usuarios para obtener el email
      WHERE m.incidencia_id = ?
    `;
    const [rows] = await pool.execute(query, [incidentId]);
    return rows;
  } catch (error) {
    throw error;
  }
};
