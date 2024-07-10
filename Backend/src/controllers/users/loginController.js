import bcrypt from 'bcrypt'; //-> encriptar password
import * as userModel from '../../models/users/index.js';
import {
    invalidCredentialsError,
    pendingActivationError,
} from '../../services/errorService.js';

import { generateToken } from '../../utils/jwtHandler.js';
import loginUserSchema from '../../schema/user/loginUserSchema.js';

const loginController = async (req, res, next) => {
    try {
        await loginUserSchema.validateAsync(req.body);
        const { email, password } = req.body;

        const user = await userModel.getUserByEmail(email);

        //-> validación de la contraseña.
        let validPass;

        if (user) {
            validPass = await bcrypt.compare(password, user.password);
        }

        //-> validar email y contraseña.
        if (!user || !validPass) {
            invalidCredentialsError();
        }

        //-> si cuenta no está activa.
        if (!user.active) {
            pendingActivationError();
        }

        //-> si todo esta bien, email, contraseña y esta activo, entonces generamos token y sesión.
        const token = generateToken(user);

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default loginController;
