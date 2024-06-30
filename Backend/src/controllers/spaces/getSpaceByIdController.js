import * as spaceModel from '../../models/spaces/index.js';

const getSpaceByIdController = async (req, res, next) => {
    try {
        const { spaceId } = req.params;

        const space = await spaceModel.getSpaceById(spaceId);

        res.send({
            status: 'ok',
            data: {
                space,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getSpaceByIdController;