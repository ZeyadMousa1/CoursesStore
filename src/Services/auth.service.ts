import { IUserWithPassword, LoginUser } from '../Interfaces/user.interface';
import { PasswordService } from "../helpers/jwt/passwordService";
import { JwtGenerator } from "../helpers/jwt/tokens";
import { userModel } from "../models/user.model";
import { createCustomError } from "../utils/appError";
import { Status } from "../utils/httpStatusText";

class AuthService{
    async register(IUser: IUserWithPassword) {
        const { firstName, lastName, email, password, role } = IUser;

        // Check if email or password is empty
        if (!email || !password || !firstName || !lastName) throw createCustomError(`your information not must be empty`, 404, Status.FAIL)

        // Check if Email already exists
        const oldUser = await userModel.findOne({ email })
        if (oldUser) throw createCustomError(`user already exists`, 404, Status.FAIL)

        const hashedPassword = await PasswordService.hashPassword(password);
        
        // Create User
        const user = new userModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        })

        // Generate Token
        const token = JwtGenerator.generateJwtAccessToken({ userId: user._id , email: user.email, role: user.role})
        user.token = token;

        // Save new User
        await user.save();
        
        return {
            status: Status.SUCCESS,
            data: {
                user
            }
        }
    }

    async login(IUser: LoginUser) {
        const { email, passsword } = IUser

        if(!email || !passsword) throw createCustomError(`Email and Password are required`, 404, Status.FAIL)
        
        const user = await userModel.findOne({ email: email })

        const matchedPassword = await PasswordService.comparePassword(passsword, user!.password)

        if (user && matchedPassword) {
            const token = JwtGenerator.generateJwtAccessToken({ userId: user._id , email: user.email, role: user.role });

            return {
                status: Status.SUCCESS,
                token
            } 
        } else {
            throw createCustomError(`incoorect Email or Password`, 404, Status.FAIL)
        } 
    }
}

export const authService = new AuthService();

/*
    Reqgister -> {
        1- create user and hashed password
        2- generate token
    }
*/