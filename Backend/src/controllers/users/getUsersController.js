import * as userModel from '../../models/users/index.js';
const getUsersController = async (req, res, next) => {
    const filters = req.query;

    try {
        const findUsers = await userModel.getAllUsers(filters);
        res.json({
            status: 'ok',
            data: findUsers
        });
        
    } catch (err) {
        netx(err);
    }
};

export default getUsersController;