import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { createCustomError } from "../utils/appError";
import { Status } from "../utils/httpStatusText";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'] 

    if (!authHeader) {
        const msg = createCustomError("token is required", 401, Status.FAIL)
        return next(msg)
    }
    
    const token = authHeader.split(' ')[1]

    try {
        verify(token, process.env.JWT_SECRET_KEY!);
        next();
    } catch (err) {
        const error = createCustomError("Token Invalid", 401, Status.FAIL);
        return next(error)
    }
}