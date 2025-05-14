import { verifyToken } from '../service/auth.service.js';
import { publicRoutes } from '../config/route.config.js';
import { minimatch } from 'minimatch';

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
