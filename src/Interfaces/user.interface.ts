import { Roles } from "../utils/userRoles"

export interface IUser{
    firstName: string,
    lastName: string,
    email: string,
    role: Roles
}

export interface IUserWithPassword extends IUser{
    password: string
}

export interface UserPassword{
    password: string
}


export interface LoginUser{
    email: string,
    passsword: string
}