import { Horoscope } from '../model/horoscope.js';

/**
 * Finds a horoscope by zodiac and date.
 *
 * @param {string} zodiac - Zodiac sign.
 * @param {string} date - Date in 'yyyy-MM-dd' format.
 *
 * @returns {Promise<import('../model/horoscope').HoroscopeDoc | null>}
 */
export const findByZodiacAndDate = async (zodiac, date) => {
    return Horoscope.findOne({
        zodiac: zodiac,
        date: date,
    });
};
