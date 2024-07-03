export default function errorHandler(error, req, res, next) {
    console.error(error);

    res.status(error.status || 500).send({
        status: 'error',
        message: error.message,
    });
}
