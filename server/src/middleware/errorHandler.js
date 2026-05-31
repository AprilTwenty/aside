import AppError from "../utils/AppError.js";

const errorHandler = (err, req, res, next) => {
    console.log({
        message: err.message,
        stack: err.stack
    });

    if (err.name === "JsonWebTokenError") {
        err = new AppError(`Invalid token`, 401);
    }
    if (err.name === "TokenExpiredError") {
        err = new AppError(`Expired token`, 401);
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: statusCode === 500 ? "internal server error" : err.message
    });
};
export default errorHandler;
