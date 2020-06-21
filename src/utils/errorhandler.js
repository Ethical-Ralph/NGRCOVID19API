const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};

exports.errorHandler = (app) => {
    app.use((req, res, next) => {
        const err = new Error();
        err.message = 'Not found';
        err.name = 'notfound';
        err.statusCode = 404;
        next(err);
    });

    return (err, req, res, next) => {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error';

        if (process.env.NODE_ENV === 'development') {
            sendErrorDev(err, res);
        } else if (process.env.NODE_ENV === 'production') {
            sendErrorProd(err, res);
        }
    };
};
