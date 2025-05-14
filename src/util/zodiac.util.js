import { parse, isWithinInterval } from 'date-fns';
import { ZODIAC_DATE_MAPPING } from '../constants/zodiac.constants.js';
import AppError from '../error/AppError.js';

const isDateInRange = (date, startDate, endDate) => {
    const start = parse(startDate, 'MM-dd', date);
    const end = parse(endDate, 'MM-dd', date);

    console.log(date, start, end);
    console.log(isWithinInterval(date, { start, end }));

    return isWithinInterval(date, { start, end });
};

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
