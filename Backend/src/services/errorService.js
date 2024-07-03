export const emailALreadyRegisterError = () => {
    throw {
        httpStatus: 409, // conflicto
        code: 'EMAIL_ALREADY_REGISTERED',
        message: 'El email ya está registrado, intenta con otro!',
    };
};

export const usernamelALreadyRegisterError = () => {
    throw {
        httpStatus: 409, // conflicto
        code: 'USERNAME_ALREADY_REGISTERED',
        message: 'El username ya está registrado, intenta con otro!',
    };
};

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

export const sendEmailError = () => {
    throw {
        httpStatus: 500, // Internal server error
        code: 'SEND_EMAIL_FAILED',
        message: 'Error al enviar email',
    };
};

export const pendingActivationError = () => {
    throw {
        httpStatus: 403, // Forbidden
        code: 'PENDING_ACTIVATION',
        message:
            'Usuario pendiente de activar. Por favor, verifica tu cuenta antes de continuar.',
    };
};

export const recoveryCodeError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'INVALID_RECOVERY_CODE',
        message: 'Código de recuperación incorrecto',
    };
};