import { verifyToken } from '../service/auth.service.js';
import { publicRoutes } from '../config/route.config.js';
import { minimatch } from 'minimatch';

/**
 * Authentication middleware. Verifies the Bearer token in the request header.
 * If the token is invalid, it sends 401 Unauthorized response.
 * If the token is valid, it adds the user information to the request object and calls the next middleware.
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @param {import('express').NextFunction} next - The next middleware function
 */
export const Authenticator = (req, res, next) => {
    if (publicRoutes.some((pattern) => minimatch(req.path, pattern))) {
        return next();
    }
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        const userInfo = verifyToken(token);
        if (!userInfo) {
            return res.status(401).send('Invalid token');
        } else {
            req.userInfo = userInfo;
            return next();
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('INTERNAL_SERVER_ERROR');
    }
};
