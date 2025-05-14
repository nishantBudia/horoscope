import { User } from '../model/user.js';
import AppError from '../error/AppError.js';

/**
 * Saves a new user to the database.
 *
 * @param {User} user - The user to be saved. Must be an instance of the User model.
 *
 * @throws {AppError} - If the provided object is not a valid user.
 *
 * @returns {Promise<User>}
 */
export const saveNewUser = async (user) => {
    if (!(user instanceof User)) {
        throw new AppError('provided object is not a valid user', 400);
    }
    return user.save();
};

/**
 * Checks if a user with the given email exists in the database.
 *
 * @param {string} email - The email of the user to search for.
 *
 * @returns {Promise<boolean>}
 */
export const existsByEmail = async (email) => {
    return User.exists({
        email: email,
    });
};

/**
 * Finds a user by their email and password.
 *
 * @param {string} email - The email of the user to search for.
 * @param {string} password - The password of the user to search for.
 *
 * @returns {Promise<User | null>}
 */
export const findByEmailAndPassword = async (email, password) => {
    return User.findOne({
        email: email,
        password: password,
    });
};
