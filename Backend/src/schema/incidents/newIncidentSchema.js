import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

const newIncidentSchema = joi.object({
    reserva_id: joi
        .number()
        .integer()
        .positive()
        .required()
        .messages(joiErrorMessages),
    usuario_id: joi
        .string()
        .guid({ version: 'uuidv4' })
        .required()
        .messages(joiErrorMessages),
    categoria_incidencia_id: joi
        .number()
        .integer()
        .positive()
        .required()
        .messages(joiErrorMessages),
    titulo: joi
        .string()
        .min(5)
        .max(100)
        .required()
        .messages(joiErrorMessages)
});

export default newIncidentSchema;
