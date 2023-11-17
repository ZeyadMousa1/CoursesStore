import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { createCustomError } from "../../utils/appError";
import { Status } from "../../utils/httpStatusText";
import { IUser, IUserWithPassword } from "../../Interfaces/user.interface";


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'] 

    if (!authHeader) {
        const msg = createCustomError(
            "you are not login, please login to get access this route",
            401, Status.FAIL)
        
        return next(msg)
    }
    
    const token = authHeader.split(' ')[1]
    
    try {
        const currentUser = verify(token, process.env.JWT_SECRET_KEY!);
        (req as any).currentUser = currentUser
        next();
    } catch (err) {
        const error = createCustomError("Token Invalid", 401, Status.FAIL);
        return next(error)
    }
}

/*
    when delete user
    when changePassword
*/