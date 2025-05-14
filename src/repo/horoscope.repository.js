import { Horoscope } from '../model/horoscope.js';

export const findByZodiacAndDate = async (zodiac, date) => {
    return Horoscope.findOne({
        zodiac: zodiac,
        date: date,
    });
};
