import { getCache, setCache } from './cache.service.js';
import { format, subDays } from 'date-fns';
import { findByZodiacAndDate } from '../repo/horoscope.repository.js';
import { save } from '../repo/user_horoscope_history.repository.js';
import { UserHoroscopeHistory } from '../model/user-horoscope-history.js';

export const getHoroscopeToday = async (userId, zodiac) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    let horoscope = await getOrUpdateHoroscopeCache(userId, zodiac, today);
    await createUserHoroscopeHistory(userId, horoscope);
    return horoscope;
};

export const getHoroscopeLastNDays = async (userId, zodiac, numDays) => {
    let date = new Date();
    const horoscopes = [];

    for (let i = 0; i < numDays; i++) {
        const dateStr = format(date, 'yyyy-MM-dd');
        let horoscope = await getOrUpdateHoroscopeCache(
            userId,
            zodiac,
            dateStr
        );
        await createUserHoroscopeHistory(userId, horoscope);
        horoscopes.push(horoscope);
        date = subDays(date, 1);
    }

    return horoscopes;
};

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

const createUserHoroscopeHistory = async (userId, horoscope) => {
    save(new UserHoroscopeHistory({ userId, horoscope }));
};
