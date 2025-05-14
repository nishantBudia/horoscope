/**
 * Handles any errors that occur within the application.
 * @param {Error} err - the error to be handled
 * @param {import('express').Request} req - the Express request object
 * @param {import('express').Response} res - the Express response object
 * @param {import('express').NextFunction} next - the Express next function
 */
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};

export default errorHandler;
