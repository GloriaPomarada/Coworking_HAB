import * as userModel from '../../models/users/updateUserModel.js';
import { notFoundError } from '../../services/errorService.js';
import userUpdateSchema from '../../schema/user/userUpdateSchema.js';

// Controlador para actualizar un espacio.
const updateUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, email, password, avatar } = req.body;
        await validateSchema(userUpdateSchema, req.body);

        // Si faltan datos requeridos, lanzamos error.
        if (!username || !email || !password || !avatar) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Llamamos al modelo para que realice la petición a la DB.
        const rowsAffected = await userModel.updateUser({
            id,
            username,
            email,
            password,
            avatar,
        });

        // Enviamos respuesta al cliente.
        if (rowsAffected > 0) {
            res.status(200).send({
                status: 'ok',
                data: {
                    id,
                    username,
                    email,
                    password,
                    avatar,
                },
            });
        } else {
            notFoundError('usuario');
        }
    } catch (err) {
        next(err);
    }
};

export default updateUserController;
