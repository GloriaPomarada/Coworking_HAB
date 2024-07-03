import validateSchema from '../../utils/validateSchema.js';
import updatePassworSchema from '../../schema/user/updatePasswordSchema.js';
import * as userModel from '../../models/users/index.js';

const passwordResetController = async (req, res, next) => {
    try {
        const { email, recoverPassCode, newPassword } = req.body;

        // Validamos el body con Joi.
        await validateSchema(updatePassworSchema, req.body);

        await userModel.resetPassword(email, recoverPassCode, newPassword);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (err) {
        next(err);
    }
};

export default passwordResetController;
