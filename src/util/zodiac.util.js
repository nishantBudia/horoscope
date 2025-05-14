import { parse, isWithinInterval } from 'date-fns';
import { ZODIAC_DATE_MAPPING } from '../constants/zodiac.constants.js';
import AppError from '../error/AppError.js';

/**
 * Checks if the given date is within the range specified by the
 * start and end dates.
 * @param {Date} date The date to check.
 * @param {string} startDate The start date in MM-dd format.
 * @param {string} endDate The end date in MM-dd format.
 * @returns {boolean} true if the date is within the range, false otherwise.
 */
const isDateInRange = (date, startDate, endDate) => {
    const start = parse(startDate, 'MM-dd', date);
    const end = parse(endDate, 'MM-dd', date);

    console.log(date, start, end);
    console.log(isWithinInterval(date, { start, end }));

    return isWithinInterval(date, { start, end });
};

/**
 * Determines the zodiac sign based on a given birthdate.
 *
 * @param {string} birthdate - The birthdate in 'yyyy-MM-dd' format.
 * @returns {string} The zodiac sign corresponding to the birthdate.
 * @throws {AppError} Throws an error if the zodiac sign cannot be determined.
 */
export const getZodiacSign = (birthdate) => {
    const date = parse(birthdate, 'yyyy-MM-dd', new Date());

    const zodiac = ZODIAC_DATE_MAPPING.find(({ startDate, endDate }) =>
        isDateInRange(date, startDate, endDate)
    )?.enumValue;

    console.log(zodiac);

    if (!zodiac) {
        throw new AppError('Unable to map zodiac to date', 400);
    }
    return zodiac;
};
