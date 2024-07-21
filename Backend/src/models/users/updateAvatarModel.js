import pool from "../../config/connection.js";

// Consulta a la DB para actualizar el avatar de un usuario.
const updateAvatarModel = async (avatarName, userId) => {
  await pool.query(`UPDATE usuarios SET avatar = ? WHERE id = ?`, [
    avatarName,
    userId,
  ]);
};

export default updateAvatarModel;
