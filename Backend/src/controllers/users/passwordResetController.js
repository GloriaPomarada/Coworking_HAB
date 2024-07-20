import validateSchema from '../../utils/validateSchema.js';
import resetPassworSchema from '../../schema/user/resetPasswordSchema.js';
import * as userModel from '../../models/users/index.js';

const passwordResetController = async (req, res, next) => {
    try {
        const { email, recoverPassCode, newPassword } = req.body;

        // Validamos el body con Joi.
        await validateSchema(resetPassworSchema, req.body);

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
