import { userService } from "../Services/user.service";
import { Request, Response, NextFunction } from "express";
import { IUser, IUserWithPassword,LoginUser, UserPassword } from '../Interfaces/user.interface';

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

   async updateUser(req: Request, res: Response, next: NextFunction) {
      const IUser: IUser = {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         role: req.body.role,
      }

      const { id } = req.params

      try { 
         const user = await userService.updateUser(IUser, id)
         res.status(200).json(user)
      } catch (err) {
         next(err)
      }
   }

   async changePassword(req: Request, res: Response, next: NextFunction) {
      const IUser: UserPassword = {
         password: req.body.password
      }

      const { id } = req.params
      try {
         const user = await userService.changePassword(IUser, id);
         res.status(200).json(user)
      } catch (err) {
         next(err)
         console.log(err)
      }

   }

   async getUser(req: Request, res: Response, next: NextFunction) {
      const {id} = req.params
      try {
         const user = await userService.getUser(id)
         res.status(201).json(user)
      } catch (err) {
         next(err)
      }
   }

   async deleteUser(req: Request, res: Response, next: NextFunction) {
      const { id } = req.params
      try {
         const user = await userService.deleteUser(id);
         res.status(201).json(user)
      } catch (err) {
         next(err)
      }
   }

   // async register(req: Request, res:Response, next:NextFunction) {
      // const user: IUserWithPassword = {
      //    firstName: req.body.firstName,
      //    lastName: req.body.lastName,
      //    email: req.body.email,
      //    password: req.body.password,
      //    role: req.body.role
      // }
   //    try {
   //       const userRegister = await userService.register(user);
   //       res.status(200).json(userRegister)
   //    } catch (err) {
   //       next(err)
   //    }

   // }


   // async login(req: Request, res:Response, next:NextFunction) {
   //    const userLogin: LoginUser = {
   //       email: req.body.email,
   //       passsword: req.body.password
   //    }
   //    try {
   //       const user = await userService.login(userLogin)
   //       res.status(200).json(user)
   //    } catch (err) {
   //       next(err)
   //    }
   // }
}

export const userController = new UserController();