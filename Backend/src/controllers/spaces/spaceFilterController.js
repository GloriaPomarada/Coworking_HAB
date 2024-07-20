import * as spaceModel from '../../models/spaces/index.js';


const getFilterSpace = async (req, res, next) => {
    const filters = req.query;

    try {
        const findSpaces = await spaceModel.filteredSpaces(filters);

        res.send({
            status: 'ok',
            data: findSpaces,
        });
        
    } catch (err) {
        next(err);
    }
};


export default getFilterSpace;