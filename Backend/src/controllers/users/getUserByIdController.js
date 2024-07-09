import * as userModel from '../../models/users/index.js';

const getUserByIdController = async (req, res, next) => {
    const user = await userModel.getUserById(req.user.id);

    try {
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