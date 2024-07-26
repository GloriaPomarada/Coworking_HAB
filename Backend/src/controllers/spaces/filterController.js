import * as spaceModel from '../../models/spaces/index.js';

const filter = async (req, res, next) => {
    const filters = req.query;

    //*-> Lógica para la ordenación de resultados.
    if (req.query.orderBy) {
        const allowedColumns = [
            'precio_espacio_completo',
            'capacidad',
            'valoracion_media',
        ];
        if (allowedColumns.includes(req.query.orderBy)) {
            filters.orderBy = req.query.orderBy;
            filters.orderDirection =
                req.query.orderDirection &&
                ['ASC', 'DESC'].includes(req.query.orderDirection.toUpperCase())
                    ? req.query.orderDirection.toUpperCase()
                    : 'ASC';
        }
    }

    try {
        const findSpaces = await spaceModel.filterModel(filters);

        res.send({
            status: 'ok',
            data: findSpaces,
        });
    } catch (err) {
        next(err);
    }
};

export default filter;
