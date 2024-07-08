import {
    invalidCredentialsError,
    notAuthenticatedError,
} from '../services/errorService.js';
import { verifyToken } from '../utils/jwtHandler.js';

const authenticate = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            notAuthenticatedError();
        }

        try {
            const tokenInfo = verifyToken(authorization);
            req.user = tokenInfo;
            next();
        } catch (error) {
            invalidCredentialsError();
        }
    } catch (error) {
        next(error);
    }
};

export default authenticate;
