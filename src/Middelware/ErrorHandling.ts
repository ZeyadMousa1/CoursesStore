import { NextFunction, Request, Response} from "express"
import { Status } from '../utils/httpStatusText';
import { AppError } from "../utils/appError";

export const notFound = (req: Request, res: Response) => {
    res.json({
        message: "Route Not Found"
    })
}

export const errorHandlerMiddelware = (err: Error, req:Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ status: err.statusText, msg: err.message })
    }
    return res.status(500).json({ status: Status.ERROR, msg: 'Something went wrong, please try again' })
}
