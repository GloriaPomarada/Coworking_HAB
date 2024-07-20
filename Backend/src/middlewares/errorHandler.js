const errorHandler = (err, req, res, next) => {
    const status = err.httpStatus || 500; 
    
    const message = err.message || 'Error interno del servidor';
    res.status(status).json({ mensaje: message });
};


export default errorHandler;