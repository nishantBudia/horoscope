import {
    getHoroscopeToday as getHoroscopeTodayService,
    getHoroscopeLastNDays as getHoroscopeLastNDaysService,
} from '../service/horoscope.service.js';

export const getHoroscopeToday = async (req, res) => {
    return res.status(200).send({
        success: true,
        data: {
            horoscope: await getHoroscopeTodayService(
                req.userInfo.id,
                req.userInfo.zodiac
            ),
        },
    });
};

export const getHoroscopeLastNDays = async (req, res) => {
    return res.status(200).send({
        success: true,
        data: {
            horoscope: await getHoroscopeLastNDaysService(
                req.userInfo.id,
                req.userInfo.zodiac,
                7
            ),
        },
    });
};
