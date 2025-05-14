import { UserHoroscopeHistory } from '../model/user-horoscope-history.js';

/**
 * Saves a UserHoroscopeHistory object to the database
 * @param {UserHoroscopeHistory} userHoroscopeHistory - The object to save
 * @returns {Promise<Document>} - The saved document
 */
export const save = async (userHoroscopeHistory) => {
    return UserHoroscopeHistory.insertOne(userHoroscopeHistory);
};
