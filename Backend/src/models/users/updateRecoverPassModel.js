import getPool from '../../config/getPool.js';

// Importamos los servicios.
import sendMailUtils from '../../utils/sendMailUtils.js';

// Consulta a la base de datos para actualizar el password de un usuario.
const updateRecoverPassModel = async (email, recoverPassCode) => {
    const pool = await getPool();

    // Actualición de código de recuperación de contraseña
    await pool.query(
        `UPDATE usuarios SET recoverPassCode = ? WHERE email = ?`,
        [recoverPassCode, email]
    );
    // Creamos el asunto del email de recuperación de contraseña.
    const emailSubject = 'Recuperación de contraseña';

    // Creamos el contenido del email
    const emailBody = `
        Se ha solicitado la recuperación de contraseña para este email en Coworking. 
            
        Utiliza el siguiente código para crear una nueva contraseña: ${recoverPassCode}

        Si no has sido tú ignora este email.
    `;

    // Enviamos el email de verificación al usuario.
    await sendMailUtils(email, emailSubject, emailBody);
};
console.log();
export default updateRecoverPassModel;
