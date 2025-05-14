/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User horoscope data
 */

/**
 * @swagger
 * /v1/api/horoscope/today:
 *   get:
 *     summary: Get today's horoscope for the authenticated user
 *     tags:
 *       - Horoscope
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: A JSON object containing today's horoscope
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     horoscope:
 *                       type: string
 */

/**
 * @swagger
 * /v1/api/horoscope/history:
 *   get:
 *     summary: Get horoscope for last 7 days
 *     tags:
 *       - Horoscope
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: A JSON object with 7 horoscopes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     horoscope:
 *                       type: array
 *                       items:
 *                         type: string
 *       500:
 *         description: Internal Server Error
 */

import express from 'express';
import {
    getHoroscopeLastNDays,
    getHoroscopeToday,
} from '../../controller/horoscope.controller.js';

const router = express.Router();

router.get('/today', getHoroscopeToday);
router.get('/history', getHoroscopeLastNDays);

export default router;
