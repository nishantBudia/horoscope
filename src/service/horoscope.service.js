import { getCache, setCache } from './cache.service.js';
import { format, subDays } from 'date-fns';
import { findByZodiacAndDate } from '../repo/horoscope.repository.js';
import { save } from '../repo/user_horoscope_history.repository.js';
import { UserHoroscopeHistory } from '../model/user-horoscope-history.js';

/**
 * Retrieves the horoscope for today for a given user ID and zodiac.
 *
 * @param {string} userId - The user ID.
 * @param {Zodiac} zodiac - The zodiac.
 *
 * @returns {string} The horoscope.
 *
 * @throws {Error} If no horoscope was found for the given zodiac and date.
 */
export const getHoroscopeToday = async (userId, zodiac) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    let horoscope = getOrUpdateHoroscopeCache(userId, zodiac, today);
    await createUserHoroscopeHistory(userId, horoscope);
    return horoscope;
};

/**
 * Retrieves horoscopes for the last `numDays` for a given user and zodiac sign.
 *
 * @param {string} userId - The user id.
 * @param {string} zodiac - The zodiac sign.
 * @param {number} numDays - The number of days to retrieve horoscopes for.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of horoscopes.
 */
export const getHoroscopeLastNDays = async (userId, zodiac, numDays) => {
    let date = new Date();
    const horoscopes = [];

    for (let i = 0; i < numDays; i++) {
        const dateStr = format(date, 'yyyy-MM-dd');
        let horoscope = getOrUpdateHoroscopeCache(userId, zodiac, dateStr);
        await createUserHoroscopeHistory(userId, horoscope);
        horoscopes.push(horoscope);
        date = subDays(date, 1);
    }

    return horoscopes;
};

/**
 * Retrieves a horoscope for a given zodiac and date. If the horoscope is not
 * cached, it will be retrieved from the database and cached for future use.
 *
 * @param {string} userId - The user ID.
 * @param {Zodiac} zodiac - The zodiac.
 * @param {string} date - The date, in the format "yyyy-MM-dd".
 *
 * @returns {string} The horoscope.
 *
 * @throws {Error} If no horoscope was found for the given zodiac and date.
 */
const getOrUpdateHoroscopeCache = async (userId, zodiac, date) => {
    const key = `${zodiac}:${date}`;

    const cached = await getCache(key);
    if (cached != null) {
        return cached;
    }

    const record = await findByZodiacAndDate(zodiac, date);
    if (!record) {
        throw new Error(`No horoscope found for ${zodiac} on ${date}`);
    }

    await setCache(key, record.horoscope);
    return record.horoscope;
};

/**
 * Creates a user horoscope history entry for the given user and horoscope.
 * @param {string} userId - The user id.
 * @param {string} horoscope - The horoscope.
 */
const createUserHoroscopeHistory = async (userId, horoscope) => {
    await save(new UserHoroscopeHistory({ userId, horoscope }));
};
