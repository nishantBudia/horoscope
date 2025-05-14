import { User } from '../model/user.js';
import jwt from 'jsonwebtoken';
import {
    existsByEmail,
    findByEmailAndPassword,
    saveNewUser,
} from '../repo/user.repository.js';
import { getZodiacSign } from '../util/zodiac.util.js';
import AppError from '../error/AppError.js';

export const createUser = async (user) => {
    if (await existsByEmail(user.email)) {
        throw new AppError('User already exists, please login', 400);
    }

    await saveNewUser(
        new User({
            ...user,
            zodiac: getZodiacSign(user.birthdate),
        })
    );

    return {
        success: true,
    };
};

export const loginUser = async (loginRequest) => {
    let user = await findByEmailAndPassword(
        loginRequest.email,
        loginRequest.password
    );

    if (!user) {
        throw new AppError('Invalid credentials', 400);
    }

    return createUserToken(user);
};

const createUserToken = (user) => {
    const token = jwt.sign(
        {
            email: user.email,
            name: user.name,
            id: user._id,
            birthdate: user.birthdate,
            zodiac: user.zodiac,
        },
        process.env.PRIVATE_KEY,
        { algorithm: 'RS256' }
    );
    console.log(user, token);
    return { token };
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.PUBLIC_KEY);
    } catch (err) {
        console.log('Token verification failed: ' + err);
        return null;
    }
};
