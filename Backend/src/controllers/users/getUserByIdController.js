import * as userModel from '../../models/users/index.js';

const getUserByIdController = async (req, res, next) => {
    try {
        const user = await userModel.getUserById(req.user.id);
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

export default getUserByIdController;
