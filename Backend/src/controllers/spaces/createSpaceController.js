import createSpaceModel from '../../models/spaces/createSpaceModel.js';
import newSpaceSchema from '../../schema/spaceSchema/newSpaceSchema.js';
// Controlador para crear un espacio.
const createSpaceController = async (req, res, next) => {
    try {
        await newSpaceSchema.validateAsync(req.body);
        const {
            nombre,
            descripcion,
            categoria_id,
            capacidad,
            precio_por_persona,
            precio_espacio_completo,
            direccion,
            estado,
            incidencias,
            imagen,
        } = req.body;

        //Si faltan datos requeridos, lanzamos error.
        if (
            !nombre ||
            !categoria_id ||
            !capacidad ||
            !precio_por_persona ||
            !precio_espacio_completo ||
            !direccion
        ) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        //Hay que validar el esquema con Joi

        // id user
        // const { id } = req.user;

        //Llamamos al modelo para que realice la petición a la DB.

        const espacioId = await createSpaceModel({
            nombre,
            descripcion,
            categoria_id,
            capacidad,
            precio_por_persona,
            precio_espacio_completo,
            direccion,
            estado,
            incidencias,
            imagen,
        });

        //Enviamos respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            data: {
                id: espacioId,
                nombre,
                descripcion,
                categoria_id,
                capacidad,
                precio_por_persona,
                precio_espacio_completo,
                direccion,
                estado,
                incidencias,
                imagen,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default createSpaceController;
