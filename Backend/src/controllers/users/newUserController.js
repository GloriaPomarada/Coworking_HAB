import randomstring from 'randomstring'; 
import validateSchema from '../../utils/validateSchema.js';
import newUserSchema from '../../schema/user/newUserSchema.js';
import sendMailUtil from '../../utils/sendMailUtils.js';
import * as userModel from '../../models/users/index.js';

const newUserController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // -> Validamos body con Joi.
        await validateSchema(newUserSchema, req.body);

        const registrationCode = randomstring.generate(30);

        const emailSubject = 'Activación Cuenta Espacios Coworking';
        const emailBody = `
    ¡Hola, ${username}!

    Bienvenido a Coworking Space!!
    Éste es tu código de registro: 
       <strong> ${registrationCode} </strong>
       
    Úsalo para activar tu cuenta.
   `;

        await userModel.insertUser(username, email, password, registrationCode);

         console.log(registrationCode)
        // -> Ya se ha guardado el user en la DB (lo ha hecho el modelo). Ahora enviamos correo con el registrationCode.
        await sendMailUtil(email, emailSubject, emailBody);

        // -> Una vez enviado el correo con el registrationCode mandamos respuesta al cliente.
        res.send({
            status: 'ok',
            message:
                'Usuario creado correctamente. Por favor revisa tu correo.',
        });
    } catch (err) {
        next(err);
    }
};

export default newUserController;
