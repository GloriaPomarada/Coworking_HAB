import getPool from '../../config/getPool.js';

// Consulta a la DB
const selectUserByEmailModel = async (email) => {
    const pool = await getPool();
    // Comprobación de usuario
    const [users] = await pool.query(
        `SELECT id, password, role, recoverPassCode, active FROM usuarios WHERE email = ?`,
        [email]
    );

    return users[0];
};
console.log(selectUserByEmailModel('medranoisaul5@gmail.com'));
export default selectUserByEmailModel;
