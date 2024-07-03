import * as userModel from '../../models/users/index.js';

const validateUserController = async (req, res, next) => {
    try {
        // Obtenemos el código de registro de los path params.
        const { registrationCode } = req.params;

        await userModel.validate(registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario activado!',
        });
    } catch (err) {
        next(err);
    }
};

export default validateUserController;
