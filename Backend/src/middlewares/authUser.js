import jwt from 'jsonwebtoken';

// Importamos los errores.
import {
    notAuthenticatedError,
    invalidCredentialsError,
} from '../services/errorAuth.js';

// Función controladora intermedia que desencripta el token y crea la propiedad "req.user".
// Si no hay token lanza un error.
const authUserController = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            notAuthenticatedError();
        }

        // Variable que almacenará la info del token.
        let tokenInfo;

        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (err) {
            console.log(err);
            invalidCredentialsError();
        }

        // Creamos la propiedad "req.user" y le asignamos la info del token.
        req.user = tokenInfo;

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default authUserController;
