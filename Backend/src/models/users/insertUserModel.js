import pool from '../../config/connection.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import {
    emailALreadyRegisterError,
    usernamelALreadyRegisterError,
} from '../../services/errorService.js';

const insertUserModel = async (username, email, password, registrationCode) => {
    // revisar si el usuario ya existe?
    let [users] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [
        email,
    ]);

    if (users.length > 0) emailALreadyRegisterError();

    [users] = await pool.query('SELECT id FROM usuarios WHERE username = ?', [
        username,
    ]);

    if (users.length > 0) usernamelALreadyRegisterError();

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // insertar el usario en la DB.
    const newUser = await pool.query(
        `INSERT INTO usuarios(id, username, email, password, registrationCode) VALUES(?, ?, ?, ?, ?)`,
        [uuidv4(), username, email, hashedPassword, registrationCode]
    );
    return newUser;
};

export default insertUserModel;