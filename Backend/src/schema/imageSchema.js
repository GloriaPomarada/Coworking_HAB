import joi from "joi";
import joiErrorMessages from "./joiErrorMessages.js";

const imgSchema = joi
  .object({
    name: joi.string().required().messages(joiErrorMessages),
    mimetype: joi
      .string()
      .valid(
        "image/jpeg", 
        "image/png", 
        "image/jpg", 
        "image/gif",
        "image/webp",
        "image/svg+xml",
        "image/bmp",
        "image/tiff"
      )
      .required()
      .messages(joiErrorMessages),
    size: joi.number().max(20000000).required().messages(joiErrorMessages),
  })
  .unknown(true);

export default imgSchema;
