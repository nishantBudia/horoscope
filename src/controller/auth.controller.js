import { createUser, loginUser } from '../service/auth.service.js';

export const register = async (req, res) => {
    return res.status(201).send(await createUser(req.body));
};

export const login = async (req, res) => {
    return res.status(200).send(await loginUser(req.body));
};
