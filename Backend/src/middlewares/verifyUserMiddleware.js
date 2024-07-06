import { notFoundError } from '../services/errorService.js';
import * as userModel from '../models/users/index.js';

// Función controladora que lanza un error si no existe un usuario con un id dado.
const verifyUser = async (req, res, next) => {
    try {
        const userId = req.user?.id || req.params.userId;

        const user = await userModel.getUserById(userId);
        //Lanzamos un error si el usuario no existe.
        if (!user) {
            return notFoundError('usuario');
        }

        //Pasamos control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default verifyUser;