import randomstring from 'randomstring'; // crea el código de registro random
import validateSchema from '../../utils/validateSchema.js';
import newUserSchema from '../../schema/user/newUserSchema.js';
import sendMailUtil from '../../utils/sendMailUtils.js';
import * as userModel from '../../models/users/index.js';

//-> Endpoint newUser
const newUserController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // -> Validamos body con Joi.
        await validateSchema(newUserSchema, req.body);

        // -> Generamos el codigo de registro para activar la cuenta.
        const registrationCode = randomstring.generate(30);

        // -> Generamos el correo y el cuerpo del correo.
        const emailSubject = 'Activación Cuenta Espacios Coworking';
        const emailBody = `
    ¡Hola, ${username}!
    
    Para activar tu cuenta, haz clic en el siguiente enlace:

    <a href="http://localhost:3000/api/users/activate/${registrationCode}">Activar mi cuenta</a>
   `;

        // -> Ya validada, llamamos al modelo para que realice la consulta a la base de datos.
        await userModel.insertUser(username, email, password, registrationCode);

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
