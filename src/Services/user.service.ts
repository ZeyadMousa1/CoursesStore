import { userModel } from "../models/user.model";
import { Status } from "../utils/httpStatusText";
import { IUser, LoginUser } from '../Interfaces/user.interface';
import { createCustomError } from "../utils/appError";
import { PasswordService } from "../utils/passwordService";
import * as jwt from 'jsonwebtoken';
import { JwtGenerator } from '../utils/Jwt';


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

    async register(user: IUser) {
        const { firstName, lastName, email, password } = user;

        // check if email is signed before
        const oldUser = await userModel.findOne({ email: email })
        if (oldUser) {
            throw createCustomError(`user already exists`, 404, Status.FAIL)
        }

        //hash password
        const hashedPassword = await PasswordService.hashPassword(password);

        // create new user
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        //generate jwt token
        const token = JwtGenerator.generateJwt({ email: newUser.email, id: newUser._id })
        newUser.token = token;
        
        await newUser.save();

        return {
            status: Status.SUCCESS,
            data: {newUser}
        }

    }

    async login(loginUser: LoginUser) {
        const { email, passsword } = loginUser

        if (!email && !passsword) {
            throw createCustomError(`email and password are required`, 404, Status.FAIL)
        }

        const user = await userModel.findOne({ email })
        const matchedPassword = await PasswordService.comparePassword(passsword, user!.password)

        if (user && matchedPassword) {
            const token = JwtGenerator.generateJwt({ email: user.email, id: user._id })
            return {
            status: Status.SUCCESS,
                data: {
                    token
                }
            }
        } else {
            throw createCustomError(`Email or Password is invalid`, 404, Status.FAIL)
        }
    }
}

export const userService = new UserService();