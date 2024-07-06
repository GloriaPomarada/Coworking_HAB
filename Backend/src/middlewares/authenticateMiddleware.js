import { invalidCredentialsError, notAuthenticatedError} from '../services/errorService.js';
import { verifyToken } from '../utils/jwtHandler.js';

const authenticate = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return next(notAuthenticatedError());
        }
        //-> 'Bearer Token'.
        const token = authorization.split(' ')[1];

        try {
            const tokenInfo = verifyToken(token);
            req.user = tokenInfo;
            next();
        } catch (error) {
            return next(invalidCredentialsError());
        }
    } catch (error) {
        next(error);
    }
};

export default authenticate;