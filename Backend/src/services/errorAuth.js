export const invalidCredentialsError = () => {
    throw {
        httpStatus: 401,
        code: 'INVALID_CREDENTIALS',
        message: 'Credenciales inválidas',
    };
};

export const notAuthenticatedError = () => {
    throw {
        httpStatus: 401,
        code: 'NOT_AUTHENTICATED',
        message: `Debes enviar un token en el header 'Authorization'`,
    };
};
