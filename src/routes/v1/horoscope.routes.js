import express from 'express';
import {
    getHoroscopeLastNDays,
    getHoroscopeToday,
} from '../../controller/horoscope.controller.js';

const router = express.Router();

router.get('/today', getHoroscopeToday);
router.get('/history', getHoroscopeLastNDays);

export default router;
