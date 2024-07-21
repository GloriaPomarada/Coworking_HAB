import joi from "joi";

import imgSchema from "../imageSchema.js";

const spacePhotoSchema = joi.object({
  photo: imgSchema.required(),
});

export default spacePhotoSchema;
