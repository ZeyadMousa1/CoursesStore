import { userService } from "../Services/user.service";
import { Request, Response, NextFunction } from "express";
import { IUser, LoginUser } from "../Interfaces/user.interface";

class UserController
{
   async getAllUsers(req: Request, res: Response, next: NextFunction) {
      try {
         const users = await userService.getAllUsers(req.query);
         res.status(200).json(users);
      } catch (err) {
         next(err)
      }
   }

    async register(req: Request, res:Response, next:NextFunction) {
       const user: IUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
       }
       try {
          const userRegister = await userService.register(user);
          res.status(200).json(userRegister)
       } catch (err) {
          next(err)
       }

    }

    async login(req: Request, res:Response, next:NextFunction) {
       const userLogin: LoginUser = {
          email: req.body.email,
          passsword: req.body.password
       }
       try {
          const user = await userService.login(userLogin)
          res.status(200).json(user)
       } catch (err) {
          next(err)
       }
    }
}

export const userController = new UserController();