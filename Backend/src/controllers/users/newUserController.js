import randomstring from 'randomstring';
import insertUserModel from '../models/spaces/insertUserModel';
import validateSchemaUtil from '../../utils/validateSchemaUtils';
import newUserSchema from '../schema/newUser/newUserSchema';

// Endpoint newUser
const newUser = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const { username, email, password } = req.body;

        // Validamos el body con Joi.
        await validateSchemaUtil(newUserSchema, req.body);

        // Creamos el código de registro.
        const registrationCode = randomstring.generate(30);

        // Insertar usuario a la base de datos
        await insertUserModel(username, email, password, registrationCode);

        res.send({
            status: 'ok',
            message: 'Tu usuario a sido creado, verifica tu e-mail',
        });
    } catch (err) {
        next(err);
    }
};

console.log(newUser());
export default newUser;
