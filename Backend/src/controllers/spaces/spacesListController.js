import * as spaceController from '../../models/spaces/index.js';

const spacesListController = async (req, res, next) => {
    try {
        const spaces = await spaceController.getSpaces();
        res.json(spaces);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export default spacesListController;