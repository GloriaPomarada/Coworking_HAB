import jwt from 'jsonwebtoken';
import { JWT_EXP, JWT_SECRET } from '../../env.js';

//-> payload = información a encriptar y transmitir en el token.
export const generateToken = (user) => {
    const options = {
        expiresIn: JWT_EXP, //-> 7d
    };

    let payload = {
        id: user.id,
        role: user.role,
        email: user.email,
    };

    //-> "sign" se usa para generar el token, toma el "payload" le agrega el "secret" y las opciones. Encripta y crea un token.
    //-> se le envia token a usuario.
    return jwt.sign(payload, JWT_SECRET, options);
};

//-> se recibe el token del usuario y se verifica con el secret.
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
