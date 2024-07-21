import pool from "../../config/connection.js";

const getPhotoByIdAndSpaceId = async (photoId, spaceId) => {
    const [photo] = await pool.query(
      'SELECT * FROM espacios_fotos WHERE id = ? AND espacio_id = ?',
      [photoId, spaceId]
    );
    return photo[0];
  };
  
const deletePhotoModel = async (photoId) => {
  // Eliminamos la foto.
  await pool.query(`DELETE FROM espacios_fotos WHERE id = ?`, [photoId]);
};


export { deletePhotoModel, getPhotoByIdAndSpaceId };