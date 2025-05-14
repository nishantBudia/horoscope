import Mongoose from 'mongoose';

export const UserHoroscopeHistory = Mongoose.model(
    'userHoroscopeHistory',
    new Mongoose.Schema(
        {
            userId: { type: String, required: true },
            horoscope: {
                type: String,
                required: true,
            },
        },
        { timestamps: true }
    )
);
