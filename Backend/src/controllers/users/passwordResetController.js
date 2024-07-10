import validateSchema from '../../utils/validateSchema.js';
import updatePassworSchema from '../../schema/user/updatePasswordSchema.js';
import * as userModel from '../../models/users/index.js';
import editUserPassSchema from '../../schema/user/editUserPassSchema.js';

const passwordResetController = async (req, res, next) => {
    try {
        await validateSchema(editUserPassSchema, req.body);
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
