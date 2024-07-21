import pool from "../../config/connection.js";


const insertPhotoModel = async (photoName, spaceId) => {
    // Insertamos la foto sin especificar el ID
    const [result] = await pool.query(
      `INSERT INTO espacios_fotos (name, espacio_id) VALUES(?, ?)`,
      [photoName, spaceId]
    );
  
    return result.insertId;
  };

export default insertPhotoModel;
