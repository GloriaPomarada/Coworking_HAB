import randomstring from 'randomstring';
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
import updateRecoverPassModel from '../../models/users/updateRecoverPassModel.js';
// import notFoundError from '../../services/errorService.js';

// Función controladora que valida a un usuario recién registrado.
const sendRecoverPassController = async (req, res, next) => {
    try {
        // Obtenemos el email de la persona que quiere recuperar su contraseña.
        const { email } = req.body;

        // Comprobación del email proporcionado.
        const user = await selectUserByEmailModel(email);

        // Si no existe un usuario con ese email lanzamos un error.
        if (!user) {
            notFoundError('usuario');
        }

        // Generamos el código de recuperación de contraseña.
        const recoverPassCode = randomstring.generate(10);

        // Insertamos el código de recuperación de contraseña.
        await updateRecoverPassModel(email, recoverPassCode);

        res.send({
            status: 'ok',
            message: 'Correo de recuperación de contraseña enviado',
        });
    } catch (err) {
        next(err);
    }
};
console.log(sendRecoverPassController);
export default sendRecoverPassController;
