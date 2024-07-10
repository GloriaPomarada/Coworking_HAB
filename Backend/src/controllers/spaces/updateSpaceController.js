import updateSpaceModel from '../../models/spaces/updateSpaceModel.js';
import { notFoundError } from '../../services/errorService.js';
import newSpaceSchema from '../../schema/spaceSchema/newSpaceSchema.js';

// Controlador para actualizar un espacio.
const updateSpaceController = async (req, res, next) => {
    try {
        await newSpaceSchema.validateAsync(req.body);
        const { id } = req.params;
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

        // Si faltan datos requeridos, lanzamos error.
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

        // Llamamos al modelo para que realice la petición a la DB.
        const rowsAffected = await updateSpaceModel({
            id,
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

        // Enviamos respuesta al cliente.
        if (rowsAffected > 0) {
            res.status(200).send({
                status: 'ok',
                data: {
                    id,
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
        } else {
            notFoundError('Espacio');
        }
    } catch (err) {
        next(err);
    }
};

export default updateSpaceController;
