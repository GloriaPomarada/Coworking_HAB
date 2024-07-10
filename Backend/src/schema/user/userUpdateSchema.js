import joi from 'joi';
import joiErrorMessages from '../joiErrorMessages.js';

const editUserPassSchema = joi.object({
    email: joi.string().email().max(100).required().messages(joiErrorMessages),
    username: joi.string().max(30).required().messages(joiErrorMessages),
    avatar: joi.string().max(100).required().messages(joiErrorMessages),
    recoverPassCode: joi.string().max(10).required().messages(joiErrorMessages),
});
export default editUserPassSchema;