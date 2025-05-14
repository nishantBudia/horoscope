import Mongoose from 'mongoose';
import { Zodiac } from '../enum/zodiac.js';

export const Horoscope = Mongoose.model(
    'horoscopes',
    new Mongoose.Schema(
        {
            date: {
                type: String,
                required: true,
            },
            horoscope: {
                type: String,
                required: true,
            },
            zodiac: {
                type: String,
                enum: Object.values(Zodiac),
                required: true,
            },
        },
        { timestamps: true }
    )
);
