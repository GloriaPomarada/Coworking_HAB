import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

const postMessageSchema = joi.object({
    incidencia_id: joi.number().integer().positive().required().messages(joiErrorMessages),
    mensaje: joi.string().required().messages(joiErrorMessages),
    espacio_id: joi.number().integer().positive().required().messages(joiErrorMessages),
    reserva_id: joi.number().integer().positive().required().messages(joiErrorMessages),
    usuario_id: joi.string().guid({ version: 'uuidv4' }).required().messages(joiErrorMessages),
});

export default postMessageSchema;
