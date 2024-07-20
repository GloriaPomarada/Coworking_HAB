import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

const cancelBookingSchema = joi.object({
    usuario_id: joi.string().guid({ version: 'uuidv4' }).required().messages(joiErrorMessages),
    reserva_id: joi.number().integer().positive().required().messages(joiErrorMessages),
});

export default cancelBookingSchema;
