// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const passRecoverSchema = joi.object({
    email: joi.string().email().max(100).required().messages(joiErrorMessages),

});

export default passRecoverSchema;