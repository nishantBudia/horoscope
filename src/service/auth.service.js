import { User } from '../model/user.js';
import jwt from 'jsonwebtoken';
import {
    existsByEmail,
    findByEmailAndPassword,
    saveNewUser,
} from '../repo/user.repository.js';
import { getZodiacSign } from '../util/zodiac.util.js';
import AppError from '../error/AppError.js';

/**
 * Creates a new user in the system.
 *
 * @param {Object} user - an object that should contain the following properties
 *                         - name: string
 *                         - email: string
 *                         - password: string
 *                         - birthdate: string in ISO8601 format
 *
 * @returns {Promise<Object>} - a Promise which resolves to an object with a single
 *                              property `success` set to true
 *
 * @throws {AppError} - if a user with the given email already exists
 */
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

/**
 * Logs in a user with the provided credentials.
 *
 * @param {Object} loginRequest - contains the email and password of the user to be logged in
 * @param {string} loginRequest.email - the email of the user
 * @param {string} loginRequest.password - the password of the user
 * @returns {Promise<Object>} - a Promise which resolves to a signed JWT token if the login is successful
 * @throws {AppError} - if the login credentials are invalid
 */
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

/**
 * Creates a signed JWT token for a user.
 *
 * @param {User} user - the user for which the token is created
 *
 * @returns {Object} - an object containing the token
 *
 * @throws nothing
 */
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

/**
 * Verifies a JWT token.
 *
 * @param {string} token - the JWT token to be verified
 * @returns {Object|null} - the decoded payload of the token if the verification
 *                          is successful, null otherwise
 *
 * @throws nothing
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.PUBLIC_KEY);
    } catch (err) {
        console.log('Token verification failed: ' + err);
        return null;
    }
};
