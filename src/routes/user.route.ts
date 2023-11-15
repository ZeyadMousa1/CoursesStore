import express from 'express';
import { userController } from '../Controllers/user.controller';
import { verifyToken } from '../Middelware/verifyToken';

export const userRouter = express.Router();

// Get All Users
userRouter.route('/')
    .get(verifyToken, userController.getAllUsers)

// Login
userRouter.route('/register')
    .post(userController.register)

// Register
userRouter.route('/login')
    .post(userController.login)