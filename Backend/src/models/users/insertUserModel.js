import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import getPool from '../../config/getPool.js';
import sendMailUtil from '../../utils/sendMailUtils.js';

const insertUserModel = async (username, email, password, registrationCode) => {
    const pool = await getPool();
    let [users] = await pool.query(`SELECT id FROM users WHERE username = ?`, [
        username,
    ]);
    // Si existe algún usuario con ese nombre lanzamos un error.
    if (users.length > 0) {
        emailAlreadyRegisteredError();
    }
    // Buscamos en la base de datos algún usuario con ese email.
    [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email]);

    // Si existe algún usuario con ese email lanzamos un error.
    if (users.length > 0) {
        userAlreadyRegisteredError();
    }

    // Creamos el asunto del email de verificación.
    const emailSubject = 'Activa tu usuario en Diario de Viajes :)';

    // Creamos el contenido del email
    const emailBody = `
        ¡Bienvenid@ ${username}!

        Gracias por registrarte con nosotros. Para activar tu cuenta, haz clic en el siguiente enlace:

        <a href="http://localhost:8000/users/validate/${registrationCode}">Activar mi cuenta</a>
    `;

    // Enviamos el email de verificación al usuario.
    await sendMailUtil(email, emailSubject, emailBody);

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos el usuario.
    await pool.query(
        `INSERT INTO users(id, username, email, password, registrationCode) VALUES(?, ?, ?, ?, ?)`,
        [uuid(), username, email, hashedPass, registrationCode]
    );
};

export default insertUserModel;
