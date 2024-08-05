import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

const confirmBookingSchema = joi.object({
    estado: joi
    .string()
    .valid('reservado', 'cancelada')
    .required()
    .messages(joiErrorMessages),
});

export default confirmBookingSchema;
