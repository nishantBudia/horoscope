import { validationResult } from 'express-validator';

/**
 * Express middleware to validate the request body against the rules defined with express-validator.
 *
 * If the request is invalid, the middleware will send a 400 response with a JSON object containing
 * the validation errors.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const Validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array(),
        });
    }
    next();
};
