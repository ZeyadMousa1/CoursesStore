import { userModel } from "../models/user.model";
import { Status } from "../utils/httpStatusText";
import { IUser, UserPassword } from '../Interfaces/user.interface';
import { createCustomError } from "../utils/appError";
import { PasswordService } from "../helpers/jwt/passwordService";
import { userController } from '../Controllers/user.controller';


class UserService
{
    async getAllUsers(query: any) {
        //pagination
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip = (page - 1) * limit;

        try {
            const users = await userModel.find({},{__v: false, password: false}).limit(limit).skip(skip)
            return {
                status: Status.SUCCESS,
                result: users.length,
                data: { users }
            };
         } catch (err) {
            throw err
        }
    }

    async updateUser(IUser: IUser, userId: any) {
        const { firstName, lastName, email, role } = IUser
        try { 
            const user = await userModel.findOneAndUpdate(
                { _id: userId },
                { firstName, lastName, email, role },
                { new: true }
            )
            if (!user) {
                throw createCustomError(`no user with this id ${userId}`, 404, Status.FAIL)
            }
            return {
                status: Status.SUCCESS,
                user
            }
        } catch (err) {
            throw err;
        } 
    }

    async deleteUser(userId: any) {
        try {
            const user = await userModel.findOneAndDelete({ _id: userId })
            if (!user)
                throw createCustomError(`no user with this id ${userId}`, 404, Status.FAIL)
            return {
                Status: Status.SUCCESS,
                message: "User Deleted"
            }
        } catch (err) {
            throw err;
        }
    }

    async changePassword(IUser: UserPassword, userId: any) {
        const { password } = IUser

        const hashedPassword = await PasswordService.hashPassword(password);
        try { 
            const user = await userModel.findOneAndUpdate(
                { _id: userId },
                { password: hashedPassword, passwordChangedAt: Date.now() },
                { new: true }
            )
            if (!user) {
                throw createCustomError(`no user with this id ${userId}`, 404, Status.FAIL)
            }
            return {
                status: Status.SUCCESS,
                user
            }
        } catch (err) {
            throw err;
        } 
    }

    async getUser(userId: any) {
        try {
            const user = await userModel.findById(userId);
            if (!user) throw createCustomError(`no user with this id ${userId}`, 404, Status.FAIL)
            return {
                status: Status.SUCCESS,
                user
            }
        } catch (err) {
            throw err
        }
    }
}

export const userService = new UserService();