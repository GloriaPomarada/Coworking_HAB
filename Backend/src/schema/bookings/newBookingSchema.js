import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newBookingSchema = joi.object({
    usuario_id: joi
        .string()
        .guid({ version: 'uuidv4' })
        .required()
        .messages(joiErrorMessages),
    espacio_id: joi
        .number()
        .integer()
        .positive()
        .required()
        .messages(joiErrorMessages),
    tipo: joi
        .string()
        .min(5)
        .max(100)
        .required().
        messages(joiErrorMessages),
    fecha_inicio: joi
        .date()
        .min('now')
        .required()
        .messages(joiErrorMessages),
    fecha_fin: joi
        .date()
        .min('now')
        .required()
        .messages(joiErrorMessages),
    observaciones: joi
        .string()
        .min(10)
        .max(100)
        .required()
        .messages(joiErrorMessages),
});

export default newBookingSchema;
