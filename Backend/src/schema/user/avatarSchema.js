import joi from "joi";

import imgSchema from "../imageSchema.js";

const avatarSchema = joi.object({
  avatar: imgSchema.required(),
});

export default avatarSchema;
