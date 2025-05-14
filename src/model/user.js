import Mongoose from 'mongoose';
import { Zodiac } from '../enum/zodiac.js';

export const User = Mongoose.model(
    'users',
    new Mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                unique: true,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            birthdate: {
                type: Date,
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
