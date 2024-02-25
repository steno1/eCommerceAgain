// errorMiddleWare.js

const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404).json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? "error" : error.stack,
    });
    next(error);
};


const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === "CastError" && err.kind === "ObjectId") {
        message = "Resource not found";
        statusCode = 404;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? "error" : err.stack,
    });
};

export { notFound, errorHandler };
