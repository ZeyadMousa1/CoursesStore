import { Request, Response, NextFunction } from "express"
import { createCustomError } from "../../utils/appError";
import { Status } from "../../utils/httpStatusText";

export class ManageRoles{
    static allowedTo = (...roles: string[]) => {
        
        return (req: Request, res: Response, next: NextFunction) => {
            if (!roles.includes((req as any).currentUser.role))
                throw createCustomError(`this role is not authorized`, 401, Status.FAIL)
            next();
        }
    }
}