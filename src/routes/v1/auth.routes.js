/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /v1/api/auth/register:
 *   post:
 *     summary: User signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User created successfully"
 *               user:
 *                 id: "64b7fe8f9e7c5f26a0b12a34"
 *                 name: "Nishant"
 *                 email: "nishant@example.com"
 *                 birthdate: "1998-04-21"
 *                 zodiac: "Taurus"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               message: "Email already exists"
 */

/**
 * @swagger
 * /v1/api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               message: "Login successful"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid email or password"
 */

import express from 'express';
import { login, register } from '../../controller/auth.controller.js';
import { validateLogin, validateUser } from '../../validator/auth.validator.js';
import { Validator } from '../../middleware/validator.middleware.js';

const router = express.Router();

router.post('/register', validateUser, Validator, register);
router.post('/login', validateLogin, Validator, login);

export default router;
