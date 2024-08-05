import Joi from 'joi';
import imgSchema from '../imageSchema.js';

const spacePhotoSchema = Joi.object({
    photo: Joi.alternatives()
        .try(imgSchema, Joi.array().items(imgSchema))
        .required(),
});

export default spacePhotoSchema;

// Código funcionando para subir una sola foto
// import joi from "joi";

// import imgSchema from "../imageSchema.js";

// const spacePhotoSchema = joi.object({
//   photo: imgSchema.required(),
// });

// export default spacePhotoSchema;
