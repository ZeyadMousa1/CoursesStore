import express from 'express'
import { authController } from '../Controllers/auth.controller';


export const authRouter = express.Router();


authRouter.route('/register')
    .post(authController.register)

authRouter.route('/login')
    .post(authController.login)