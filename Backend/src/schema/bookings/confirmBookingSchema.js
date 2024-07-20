import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const confirmBookingSchema = joi.object({
    estado: joi
    .string()
    .valid('reservado', 'cancelada')
    .required()
    .messages(joiErrorMessages),
});

export default confirmBookingSchema;
