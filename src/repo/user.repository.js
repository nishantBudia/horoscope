import { User } from '../model/user.js';
import AppError from '../error/AppError.js';

export const saveNewUser = async (user) => {
    if (!(user instanceof User)) {
        throw new AppError('provided object is not a valid user', 400);
    }
    return user.save();
};

export const existsByEmail = async (email) => {
    return User.exists({
        email: email,
    });
};

export const findByEmailAndPassword = async (email, password) => {
    return User.findOne({
        email: email,
        password: password,
    });
};
