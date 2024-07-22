import * as userModel from '../../models/users/index.js';

const publicProfileController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ error: 'Invalid userId provided' });
        }

        const user = await userModel.getUserById(userId, {
            isPublicProfile: true,
        });

        res.status(200).json({
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
