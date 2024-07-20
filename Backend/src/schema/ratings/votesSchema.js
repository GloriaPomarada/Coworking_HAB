import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

const votesSchema = joi.object({
    reserva_id: joi
        .number()
        .integer()
        .positive()
        .required()
        .messages(joiErrorMessages),
    value: joi
        .number()
        .integer()
        .min(1)
        .max(5)
        .required()
        .messages(joiErrorMessages)
});

export default votesSchema;