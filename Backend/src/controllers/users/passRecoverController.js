import randomstring from 'randomstring';
import * as userModel from '../../models/users/index.js';
import sendMailUtil from '../../utils/sendMailUtils.js';

// Función controladora que valida a un usuario recién registrado.

const passwordRecoverController = async (req, res, next) => {
    try {
        const { email } = req.body;

        const recoverPassCode = randomstring.generate(10);

        await userModel.recoverPassword(email, recoverPassCode);

        const emailSubject = 'Recuperación Contraseña Espacios de Coworking';

        const emailBody = `
    Se ha solicitado la recuperación de contraseña para este email en Espacios de Coworking. 
              
    Utiliza el siguiente código para crear una nueva contraseña: ${recoverPassCode}

    Si no has sido tú ignora este email.
  `;

        await sendMailUtil(email, emailSubject, emailBody);

        res.send({
            status: 'ok',
            message:
                'Se ha enviado un correo para la recuperación de la contraseña',
        });
    } catch (error) {
        next(error);
    }
};

export default passwordRecoverController;
