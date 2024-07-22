import * as userModel from '../../models/users/index.js';

const validateUserController = async (req, res, next) => {
    try {
        const { registrationCode } = req.params;

        if (!registrationCode || typeof registrationCode !== 'string') {
            return res
                .status(400)
                .json({ error: 'Invalid registration code provided' });
        }

        const result = await userModel.validate(registrationCode);

        if (!result) {
            return res
                .status(404)
                .json({ error: 'Registration code not found' });
        }

        res.status(200).json({
            status: 'ok',
            message: 'Usuario activado!',
        });
    } catch (err) {
        console.error('Error in validateUserController:', err);
        if (err.httpStatus) {
            res.status(err.httpStatus).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export default validateUserController;
