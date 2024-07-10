// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const loginUserSchema = joi.object({
    password: joi
        .string()
        .min(8)
        .max(100)
        .required()
        .messages(joiErrorMessages),
    email: joi.string().email().max(100).required().messages(joiErrorMessages),
});

export default loginUserSchema;
