// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newSpaceSchema = joi.object({
    nombre: joi.string().min(5).max(100).required().messages(joiErrorMessages),
    direccion: joi
        .string()
        .min(20)
        .max(100)
        .required()
        .messages(joiErrorMessages),
    categoria_id: joi
        .string()
        .min(1)
        .max(30)
        .required()
        .messages(joiErrorMessages),
    capacidad: joi
        .number()
        .integer()
        .positive()
        .required()
        .messages(joiErrorMessages),
    precio_por_persona: joi
        .number()
        .integer()
        .positive()
        .required()
        .messages(joiErrorMessages),
    precio_espacio_completo: joi
        .number()
        .integer()
        .positive()
        .required()
        .messages(joiErrorMessages),
    estado: joi.string().min(3).max(30).required().messages(joiErrorMessages),

    descripcion: joi.string().required(),
    incidencias: joi.string(),
    imagen: joi.string(),
});

export default newSpaceSchema;
