import { NextFunction, Request, Response } from "express";
import { IUserWithPassword, IUser, LoginUser } from '../Interfaces/user.interface';
import { authService } from "../Services/auth.service";

class AuthController{
    async register(req: Request, res: Response, next: NextFunction) {

        const IUser: IUserWithPassword = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        
        try {
            const user = await authService.register(IUser);
            res.status(201).json(user)
        } catch (err) {
            next(err)
            console.log(err)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const IUser: LoginUser = {
            email: req.body.email,
             passsword: req.body.password
        }

        try {
            const userLogin = await authService.login(IUser);
            res.status(201).json(userLogin)
        } catch (err) {
            next(err)
        }
    }
}

export const authController = new AuthController();