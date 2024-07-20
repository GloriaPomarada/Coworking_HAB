import * as userModel from '../../models/users/index.js';

const publicProfileController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await userModel.getUserById(userId, true);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
        
    } catch (err) {
        next(err);
    }
};

export default publicProfileController;
