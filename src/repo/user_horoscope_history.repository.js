import { UserHoroscopeHistory } from '../model/user-horoscope-history.js';

export const save = async (userHoroscopeHistory) => {
    return UserHoroscopeHistory.insertOne(userHoroscopeHistory);
};
